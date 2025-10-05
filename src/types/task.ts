export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TaskFormData {
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
}

export interface TaskFilters {
  search: string
  priority: 'all' | 'low' | 'medium' | 'high'
  status: 'all' | 'completed' | 'pending'
}
