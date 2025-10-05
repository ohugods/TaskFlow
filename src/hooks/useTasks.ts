import { Task, TaskFormData } from '@/types/task'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const STORAGE_KEY = 'task-manager-tasks'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  // Load tasks from localStorage
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY)
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }))
        setTasks(parsedTasks)
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
      toast.error('Erro ao carregar tarefas')
    } finally {
      setLoading(false)
    }
  }, [])

  // Save tasks to localStorage
  const saveTasks = useCallback((newTasks: Task[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
      setTasks(newTasks)
    } catch (error) {
      console.error('Error saving tasks:', error)
      toast.error('Erro ao salvar tarefas')
    }
  }, [])

  // Add new task
  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedTasks = [...tasks, newTask]
    saveTasks(updatedTasks)
    toast.success('Tarefa criada com sucesso!')
    return newTask
  }, [tasks, saveTasks])

  // Update task
  const updateTask = useCallback((id: string, updates: Partial<TaskFormData>) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    )
    saveTasks(updatedTasks)
    toast.success('Tarefa atualizada com sucesso!')
  }, [tasks, saveTasks])

  // Toggle task completion
  const toggleTask = useCallback((id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    )
    saveTasks(updatedTasks)
    const task = tasks.find((t) => t.id === id)
    toast.success(
      task?.completed ? 'Tarefa marcada como pendente' : 'Tarefa concluída!'
    )
  }, [tasks, saveTasks])

  // Delete task
  const deleteTask = useCallback((id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    saveTasks(updatedTasks)
    toast.success('Tarefa removida com sucesso!')
  }, [tasks, saveTasks])

  // Clear completed tasks
  const clearCompleted = useCallback(() => {
    const updatedTasks = tasks.filter((task) => !task.completed)
    saveTasks(updatedTasks)
    toast.success('Tarefas concluídas removidas!')
  }, [tasks, saveTasks])

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  }
}
