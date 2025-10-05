/**
 * @fileoverview Date utility functions for TaskFlow.
 * Provides formatting, comparison, and calculation functions for dates,
 * specifically tailored for Brazilian Portuguese locale and task management.
 */

/**
 * Formats a date to Brazilian Portuguese locale string (DD/MM/YYYY).
 * Uses Intl.DateTimeFormat for proper localization.
 *
 * @param date - Date object to format
 * @returns Formatted date string in pt-BR locale
 *
 * @example
 * ```typescript
 * formatDate(new Date('2023-12-25')) // "25/12/2023"
 * ```
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

/**
 * Formats a date and time to Brazilian Portuguese locale string.
 * Includes both date and time components.
 *
 * @param date - Date object to format
 * @returns Formatted date and time string in pt-BR locale
 *
 * @example
 * ```typescript
 * formatDateTime(new Date()) // "25/12/2023 14:30"
 * ```
 */
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Checks if a due date is overdue (past due date).
 * Compares only the date part, ignoring time components.
 * A task is considered overdue if its due date is before today.
 *
 * @param dueDate - The due date to check
 * @returns True if the due date is in the past
 *
 * @example
 * ```typescript
 * const yesterday = new Date()
 * yesterday.setDate(yesterday.getDate() - 1)
 * isOverdue(yesterday) // true
 * ```
 */
export const isOverdue = (dueDate: Date): boolean => {
  const today = new Date()
  const due = new Date(dueDate)

  // Reset hours to compare only dates (ignore time of day)
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  return due < today
}

/**
 * Checks if a due date is today.
 * Compares only the date part, ignoring time components.
 *
 * @param dueDate - The due date to check
 * @returns True if the due date is today
 *
 * @example
 * ```typescript
 * const today = new Date()
 * isDueToday(today) // true
 * ```
 */
export const isDueToday = (dueDate: Date): boolean => {
  const today = new Date()
  const due = new Date(dueDate)

  // Reset hours to compare only dates (ignore time of day)
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  return due.getTime() === today.getTime()
}

/**
 * Calculates the number of days until a due date.
 * Returns positive numbers for future dates, negative for past dates.
 * Uses ceiling to handle partial days (e.g., due tomorrow at 11 PM = 1 day).
 *
 * @param dueDate - The due date to calculate days for
 * @returns Number of days until due (positive) or since due (negative)
 *
 * @example
 * ```typescript
 * const tomorrow = new Date()
 * tomorrow.setDate(tomorrow.getDate() + 1)
 * getDaysUntilDue(tomorrow) // 1
 *
 * const yesterday = new Date()
 * yesterday.setDate(yesterday.getDate() - 1)
 * getDaysUntilDue(yesterday) // -1
 * ```
 */
export const getDaysUntilDue = (dueDate: Date): number => {
  const today = new Date()
  const due = new Date(dueDate)

  // Reset hours to compare only dates (ignore time of day)
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  const diffTime = due.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // Convert ms to days
}
