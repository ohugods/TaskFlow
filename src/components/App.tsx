import { useTasks } from '@/hooks/useTasks'
import { Task, TaskFilters, TaskFormData } from '@/types/task'
import { sortTasksByPriority } from '@/utils/priorityUtils'
import { CheckCircle, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { TaskFilters as TaskFiltersComponent } from './TaskFilters'
import { TaskForm } from './TaskForm'
import { TaskItem } from './TaskItem'
import { TaskStats } from './TaskStats'

const initialFilters: TaskFilters = {
  search: '',
  priority: 'all',
  status: 'all',
}

export default function App() {
  const { tasks, loading, addTask, updateTask, toggleTask, deleteTask, clearCompleted } = useTasks()
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filters, setFilters] = useState<TaskFilters>(initialFilters)

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          (task.description && task.description.toLowerCase().includes(searchLower))
      )
    }

    // Apply priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter((task) => task.priority === filters.priority)
    }

    // Apply status filter
    if (filters.status === 'completed') {
      filtered = filtered.filter((task) => task.completed)
    } else if (filters.status === 'pending') {
      filtered = filtered.filter((task) => !task.completed)
    }

    return sortTasksByPriority(filtered)
  }, [tasks, filters])

  const handleAddTask = (taskData: TaskFormData) => {
    addTask(taskData)
    setShowForm(false)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleUpdateTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
      setEditingTask(null)
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  const completedTasksCount = tasks.filter((task) => task.completed).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando tarefas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Organize suas tarefas de forma eficiente e produtiva
          </p>
        </div>

        {/* Stats */}
        {tasks.length > 0 && <TaskStats tasks={tasks} />}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary btn-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>

          {completedTasksCount > 0 && (
            <button
              onClick={clearCompleted}
              className="btn btn-outline btn-md flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Limpar Concluídas ({completedTasksCount})
            </button>
          )}
        </div>

        {/* Filters */}
        {tasks.length > 0 && (
          <TaskFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            taskCount={filteredTasks.length}
          />
        )}

        {/* Task Form */}
        {(showForm || editingTask) && (
          <div className="mb-6">
            <TaskForm
              task={editingTask || undefined}
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="card p-8 text-center">
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {tasks.length === 0 ? 'Nenhuma tarefa criada' : 'Nenhuma tarefa encontrada'}
              </h3>
              <p className="text-gray-600 mb-4">
                {tasks.length === 0
                  ? 'Comece criando sua primeira tarefa!'
                  : 'Tente ajustar os filtros para encontrar o que procura.'}
              </p>
              {tasks.length === 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary btn-md"
                >
                  Criar Primeira Tarefa
                </button>
              )}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Desenvolvido por{' '}
            <a
              href="@https://github.com/ohugods"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Hugo Dalmasio
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
