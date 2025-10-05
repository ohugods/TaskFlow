import { Task } from '@/types/task'

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

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder = { high: 3, medium: 2, low: 1 }
  
  return [...tasks].sort((a, b) => {
    // First sort by completion status (pending first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    
    // Then sort by priority
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) {
      return priorityDiff
    }
    
    // Finally sort by due date (earliest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }
    
    if (a.dueDate) return -1
    if (b.dueDate) return 1
    
    // Last resort: sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}
