// Constantes centrais do TaskFlow
export const APP_CONFIG = {
  name: 'TaskFlow',
  version: '1.0.0',
  author: 'Hugo Dalmasio',
  repository: '@https://github.com/ohugods/taskflow',
  license: 'MIT',
} as const

export const STORAGE_KEYS = {
  TASKS: 'taskflow-tasks-v1',
  SETTINGS: 'taskflow-settings-v1',
  PREFERENCES: 'taskflow-preferences-v1',
} as const

export const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const

export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

export const DATE_FORMAT = {
  DISPLAY: 'pt-BR',
  STORAGE: 'ISO',
} as const

export const UI_LIMITS = {
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_TASKS_DISPLAY: 1000,
} as const

export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 200,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutos
} as const
