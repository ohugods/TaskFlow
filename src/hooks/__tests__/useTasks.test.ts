import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTasks } from '../useTasks'

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock crypto.randomUUID
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-123',
  },
})

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('initializes with empty tasks', () => {
    const { result } = renderHook(() => useTasks())

    expect(result.current.tasks).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('loads tasks from localStorage', () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Test Task',
        completed: false,
        priority: 'medium',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      },
    ]

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks))

    const { result } = renderHook(() => useTasks())

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Test Task')
  })

  it('adds a new task', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask({
        title: 'New Task',
        description: 'New description',
        priority: 'high',
      })
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('New Task')
    expect(result.current.tasks[0].priority).toBe('high')
    expect(result.current.tasks[0].completed).toBe(false)
    expect(localStorageMock.setItem).toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalledWith('Tarefa criada com sucesso!')
  })

  it('updates an existing task', () => {
    const mockTask = {
      id: '1',
      title: 'Original Task',
      completed: false,
      priority: 'medium' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockTask]))

    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.updateTask('1', {
        title: 'Updated Task',
        priority: 'high',
      })
    })

    expect(result.current.tasks[0].title).toBe('Updated Task')
    expect(result.current.tasks[0].priority).toBe('high')
    expect(toast.success).toHaveBeenCalledWith('Tarefa atualizada com sucesso!')
  })

  it('toggles task completion', () => {
    const mockTask = {
      id: '1',
      title: 'Test Task',
      completed: false,
      priority: 'medium' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockTask]))

    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.toggleTask('1')
    })

    expect(result.current.tasks[0].completed).toBe(true)
    expect(toast.success).toHaveBeenCalledWith('Tarefa concluída!')

    act(() => {
      result.current.toggleTask('1')
    })

    expect(result.current.tasks[0].completed).toBe(false)
    expect(toast.success).toHaveBeenCalledWith('Tarefa marcada como pendente')
  })

  it('deletes a task', () => {
    const mockTask = {
      id: '1',
      title: 'Test Task',
      completed: false,
      priority: 'medium' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockTask]))

    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.deleteTask('1')
    })

    expect(result.current.tasks).toHaveLength(0)
    expect(toast.success).toHaveBeenCalledWith('Tarefa removida com sucesso!')
  })

  it('clears completed tasks', () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Completed Task',
        completed: true,
        priority: 'medium' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Pending Task',
        completed: false,
        priority: 'low' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks))

    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.clearCompleted()
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Pending Task')
    expect(toast.success).toHaveBeenCalledWith('Tarefas concluídas removidas!')
  })

  it('handles localStorage errors', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('Storage error')
    })

    renderHook(() => useTasks())

    expect(toast.error).toHaveBeenCalledWith('Erro ao carregar tarefas')
  })
})
