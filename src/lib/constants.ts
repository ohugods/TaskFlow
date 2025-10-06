/**
 * @fileoverview Central constants for TaskFlow application.
 * Defines all application-wide constants, configurations, and limits.
 * Using 'as const' to ensure TypeScript treats these as literal types.
 */

// ============================================================================
// APPLICATION CONFIGURATION
// ============================================================================

/**
 * Core application metadata and information.
 * Used for branding, version tracking, and legal information.
 */
export const APP_CONFIG = {
  name: 'TaskFlow',
  version: '1.0.0',
  author: 'Hugo Dalmasio',
  repository: 'https://github.com/ohugods/TaskFlow',
  license: 'MIT',
} as const

// ============================================================================
// STORAGE & PERSISTENCE
// ============================================================================

/**
 * localStorage keys for data persistence.
 * Versioned keys allow for future data migration strategies.
 * Pattern: 'appname-data-v{version}'
 */
export const STORAGE_KEYS = {
  TASKS: 'taskflow-tasks-v1',
  SETTINGS: 'taskflow-settings-v1',
  PREFERENCES: 'taskflow-preferences-v1',
} as const

// ============================================================================
// TASK SYSTEM
// ============================================================================

/**
 * Priority level constants for task classification.
 * Defines the three available priority levels in ascending order of urgency.
 */
export const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const

/**
 * Task completion status constants.
 * Binary states for task lifecycle management.
 */
export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

// ============================================================================
// DATA FORMATTING
// ============================================================================

/**
 * Date formatting configurations.
 * Defines how dates are displayed to users vs stored internally.
 */
export const DATE_FORMAT = {
  DISPLAY: 'pt-BR', // Brazilian Portuguese locale for user display
  STORAGE: 'ISO',   // ISO format for internal storage
} as const

// ============================================================================
// USER INTERFACE LIMITS
// ============================================================================

/**
 * UI constraints and validation limits.
 * Prevents performance issues and ensures consistent UX.
 */
export const UI_LIMITS = {
  MAX_TITLE_LENGTH: 200,       // Task title character limit
  MAX_DESCRIPTION_LENGTH: 1000, // Task description character limit
  MAX_TASKS_DISPLAY: 1000,     // Maximum tasks shown in UI (performance limit)
} as const

// ============================================================================
// PERFORMANCE TUNING
// ============================================================================

/**
 * Performance-related constants.
 * Fine-tuned values for optimal user experience and system performance.
 */
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,          // ms - Search/filter debounce delay
  ANIMATION_DURATION: 200,       // ms - UI transition duration
  CACHE_TTL: 5 * 60 * 1000,     // ms - Cache time-to-live (5 minutes)
} as const
