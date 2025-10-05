export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const isOverdue = (dueDate: Date): boolean => {
  const today = new Date()
  const due = new Date(dueDate)
  
  // Reset hours to compare only dates
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  
  return due < today
}

export const isDueToday = (dueDate: Date): boolean => {
  const today = new Date()
  const due = new Date(dueDate)
  
  // Reset hours to compare only dates
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  
  return due.getTime() === today.getTime()
}

export const getDaysUntilDue = (dueDate: Date): number => {
  const today = new Date()
  const due = new Date(dueDate)
  
  // Reset hours to compare only dates
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  
  const diffTime = due.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
