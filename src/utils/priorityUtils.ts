/**
 * @fileoverview Priority utility functions for TaskFlow.
 * Provides functions for priority color styling, labels, and sorting logic.
 * Handles the three priority levels: high, medium, and low.
 */

import { Task } from '@/types/task'

/**
 * Returns Tailwind CSS classes for priority-based styling.
 * Each priority level has distinct colors for visual identification.
 *
 * Color scheme:
 * - High: Red tones (urgent)
 * - Medium: Yellow tones (normal)
 * - Low: Green tones (relaxed)
 *
 * @param priority - Task priority level
 * @returns Tailwind CSS classes for text, background, and border colors
 *
 * @example
 * ```typescript
 * getPriorityColor('high') // "text-red-600 bg-red-50 border-red-200"
 * getPriorityColor('medium') // "text-yellow-600 bg-yellow-50 border-yellow-200"
 * ```
 */
export const getPriorityColor = (priority: Task['priority']): string => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

/**
 * Returns localized Portuguese labels for priority levels.
 * Used for displaying priority information to users.
 *
 * @param priority - Task priority level
 * @returns Human-readable priority label in Portuguese
 *
 * @example
 * ```typescript
 * getPriorityLabel('high') // "Alta"
 * getPriorityLabel('medium') // "Média"
 * getPriorityLabel('low') // "Baixa"
 * ```
 */
export const getPriorityLabel = (priority: Task['priority']): string => {
  switch (priority) {
    case 'high':
      return 'Alta'
    case 'medium':
      return 'Média'
    case 'low':
      return 'Baixa'
    default:
      return 'Não definida'
  }
}

/**
 * Sorts tasks by a multi-level priority system.
 * Sorting hierarchy (in order of importance):
 *
 * 1. Completion status (pending tasks first)
 * 2. Priority level (high > medium > low)
 * 3. Due date (earliest first, tasks with due dates prioritized)
 * 4. Creation date (newest first, as fallback)
 *
 * This ensures that urgent, pending tasks appear at the top,
 * while completed tasks are moved to the bottom.
 *
 * @param tasks - Array of tasks to sort
 * @returns New sorted array (original array is not modified)
 *
 * @example
 * ```typescript
 * const tasks = [
 *   { id: '1', priority: 'low', completed: false, dueDate: tomorrow },
 *   { id: '2', priority: 'high', completed: false, dueDate: today },
 *   { id: '3', priority: 'medium', completed: true }
 * ]
 *
 * const sorted = sortTasksByPriority(tasks)
 * // Result: [task2 (high, pending), task1 (low, pending), task3 (medium, completed)]
 * ```
 */
export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  // Priority weights for sorting (higher = more important)
  const priorityOrder = { high: 3, medium: 2, low: 1 }

  return [...tasks].sort((a, b) => {
    // Level 1: Completion status (pending tasks come first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1 // Completed tasks go to bottom
    }

    // Level 2: Priority level (high > medium > low)
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) {
      return priorityDiff // Higher priority comes first
    }

    // Level 3: Due date (earliest due dates come first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }

    // Tasks with due dates come before tasks without due dates
    if (a.dueDate) return -1
    if (b.dueDate) return 1

    // Level 4: Creation date (newest tasks come first, as fallback)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}
