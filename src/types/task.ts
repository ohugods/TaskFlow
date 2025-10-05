/**
 * @fileoverview TypeScript type definitions for the TaskFlow application.
 * Defines the core data structures used throughout the application.
 */

/**
 * Complete task entity with all persisted fields.
 * Represents a task stored in the application's state and localStorage.
 */
export interface Task {
  /** Unique identifier for the task (UUID) */
  id: string

  /** Task title/name (required, max 100 chars) */
  title: string

  /** Optional detailed description of the task */
  description?: string

  /** Completion status of the task */
  completed: boolean

  /** Priority level affecting sorting and visual styling */
  priority: 'low' | 'medium' | 'high'

  /** Optional deadline date for the task */
  dueDate?: Date

  /** Timestamp when the task was created */
  createdAt: Date

  /** Timestamp of the last update to the task */
  updatedAt: Date
}

/**
 * Data structure for task creation and editing forms.
 * Contains only the fields that can be edited by the user.
 * Excludes system fields like id, timestamps, and completion status.
 */
export interface TaskFormData {
  /** Task title/name (required field) */
  title: string

  /** Optional detailed description */
  description?: string

  /** Priority level selection */
  priority: 'low' | 'medium' | 'high'

  /** Optional deadline date */
  dueDate?: Date
}

/**
 * Filter configuration for task list display.
 * Defines how tasks should be filtered and displayed in the UI.
 */
export interface TaskFilters {
  /** Text search query (matches title and description) */
  search: string

  /** Priority filter - 'all' shows all priorities */
  priority: 'all' | 'low' | 'medium' | 'high'

  /** Status filter - 'all' shows all tasks */
  status: 'all' | 'completed' | 'pending'
}
