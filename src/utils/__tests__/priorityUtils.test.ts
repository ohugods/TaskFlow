import { Task } from '@/types/task'
import { describe, expect, it } from 'vitest'
import { getPriorityColor, getPriorityLabel, sortTasksByPriority } from '../priorityUtils'

describe('priorityUtils', () => {
  describe('getPriorityColor', () => {
    it('returns correct color for high priority', () => {
      expect(getPriorityColor('high')).toBe('text-red-600 bg-red-50 border-red-200')
    })

    it('returns correct color for medium priority', () => {
      expect(getPriorityColor('medium')).toBe('text-yellow-600 bg-yellow-50 border-yellow-200')
    })

    it('returns correct color for low priority', () => {
      expect(getPriorityColor('low')).toBe('text-green-600 bg-green-50 border-green-200')
    })
  })

  describe('getPriorityLabel', () => {
    it('returns correct label for high priority', () => {
      expect(getPriorityLabel('high')).toBe('Alta')
    })

    it('returns correct label for medium priority', () => {
      expect(getPriorityLabel('medium')).toBe('Média')
    })

    it('returns correct label for low priority', () => {
      expect(getPriorityLabel('low')).toBe('Baixa')
    })
  })

  describe('sortTasksByPriority', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Low Priority',
        completed: false,
        priority: 'low',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      },
      {
        id: '2',
        title: 'High Priority',
        completed: false,
        priority: 'high',
        createdAt: new Date('2023-01-02'),
        updatedAt: new Date('2023-01-02'),
      },
      {
        id: '3',
        title: 'Medium Priority',
        completed: false,
        priority: 'medium',
        createdAt: new Date('2023-01-03'),
        updatedAt: new Date('2023-01-03'),
      },
      {
        id: '4',
        title: 'Completed Task',
        completed: true,
        priority: 'high',
        createdAt: new Date('2023-01-04'),
        updatedAt: new Date('2023-01-04'),
      },
    ]

    it('sorts tasks by priority correctly', () => {
      const sorted = sortTasksByPriority(mockTasks)
      
      // Pending tasks should come first, sorted by priority
      expect(sorted[0].title).toBe('High Priority')
      expect(sorted[1].title).toBe('Medium Priority')
      expect(sorted[2].title).toBe('Low Priority')
      expect(sorted[3].title).toBe('Completed Task')
    })

    it('sorts by due date when priority is equal', () => {
      const tasksWithSamePriority: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          completed: false,
          priority: 'medium',
          dueDate: new Date('2023-12-31'),
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        },
        {
          id: '2',
          title: 'Task 2',
          completed: false,
          priority: 'medium',
          dueDate: new Date('2023-12-01'),
          createdAt: new Date('2023-01-02'),
          updatedAt: new Date('2023-01-02'),
        },
      ]

      const sorted = sortTasksByPriority(tasksWithSamePriority)
      expect(sorted[0].title).toBe('Task 2') // Earlier due date
      expect(sorted[1].title).toBe('Task 1')
    })

    it('sorts by creation date when no due date', () => {
      const tasksWithoutDueDate: Task[] = [
        {
          id: '1',
          title: 'Older Task',
          completed: false,
          priority: 'medium',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        },
        {
          id: '2',
          title: 'Newer Task',
          completed: false,
          priority: 'medium',
          createdAt: new Date('2023-01-02'),
          updatedAt: new Date('2023-01-02'),
        },
      ]

      const sorted = sortTasksByPriority(tasksWithoutDueDate)
      expect(sorted[0].title).toBe('Newer Task') // Newer creation date
      expect(sorted[1].title).toBe('Older Task')
    })
  })
})
