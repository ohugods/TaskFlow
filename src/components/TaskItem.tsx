/**
 * @fileoverview TaskItem component for displaying individual tasks.
 * Provides a card-based interface for task display with actions for
 * toggle completion, edit, and delete operations.
 */

import { Task } from '@/types/task'
import { formatDate, isDueToday, isOverdue } from '@/utils/dateUtils'
import { getPriorityColor, getPriorityLabel } from '@/utils/priorityUtils'
import { clsx } from 'clsx'
import { Calendar, Check, Clock, Edit, Trash2 } from 'lucide-react'

/**
 * Props for the TaskItem component
 */
interface TaskItemProps {
  /** The task object to display */
  task: Task
  /** Callback fired when task completion is toggled */
  onToggle: (id: string) => void
  /** Callback fired when task is deleted */
  onDelete: (id: string) => void
  /** Callback fired when task edit is requested */
  onEdit: (task: Task) => void
}

/**
 * TaskItem component - displays a single task with interactive actions.
 * Shows task details, priority, due date status, and action buttons.
 * Adapts visual styling based on completion status and due date.
 */
export const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  // Event handlers for task actions
  const handleToggle = () => {
    onToggle(task.id)
  }

  const handleDelete = () => {
    onDelete(task.id)
  }

  const handleEdit = () => {
    onEdit(task)
  }

  /**
   * Calculates due date information for visual styling.
   * Determines if task is overdue, due today, or has a future due date.
   * Returns null if task has no due date.
   *
   * @returns Object with date string and status flags, or null
   */
  const getDueDateInfo = () => {
    if (!task.dueDate) return null

    const dueDate = new Date(task.dueDate)
    const overdue = isOverdue(dueDate)
    const dueToday = isDueToday(dueDate)

    return {
      date: formatDate(dueDate),
      isOverdue: overdue,
      isDueToday: dueToday,
    }
  }

  // Calculate due date info once per render
  const dueDateInfo = getDueDateInfo()

  return (
    <div
      className={clsx(
        'card p-4 transition-all duration-200 hover:shadow-md',
        task.completed && 'opacity-75 bg-gray-50'
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={clsx(
            'flex-shrink-0 w-5 h-5 rounded border-2 transition-colors',
            task.completed
              ? 'bg-primary-600 border-primary-600 text-white'
              : 'border-gray-300 hover:border-primary-500'
          )}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={clsx(
                'font-medium text-gray-900',
                task.completed && 'line-through text-gray-500'
              )}
            >
              {task.title}
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Editar tarefa"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Excluir tarefa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {task.description && (
            <p
              className={clsx(
                'mt-1 text-sm text-gray-600',
                task.completed && 'line-through'
              )}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-3">
            <span
              className={clsx(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
                getPriorityColor(task.priority)
              )}
            >
              {getPriorityLabel(task.priority)}
            </span>

            {dueDateInfo && (
              <div
                className={clsx(
                  'inline-flex items-center gap-1 text-xs',
                  dueDateInfo.isOverdue
                    ? 'text-red-600'
                    : dueDateInfo.isDueToday
                    ? 'text-orange-600'
                    : 'text-gray-500'
                )}
              >
                <Calendar className="w-3 h-3" />
                {dueDateInfo.date}
                {dueDateInfo.isOverdue && (
                  <span className="font-medium">(Atrasada)</span>
                )}
                {dueDateInfo.isDueToday && !dueDateInfo.isOverdue && (
                  <span className="font-medium">(Hoje)</span>
                )}
              </div>
            )}

            <div className="inline-flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              Criada em {formatDate(task.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
