import { Task } from '@/types/task'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TaskForm } from '../TaskForm'

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test description',
  completed: false,
  priority: 'high',
  dueDate: new Date('2023-12-31'),
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
}

describe('TaskForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form for new task', () => {
    render(
      <TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    )

    expect(screen.getByText('Nova Tarefa')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite o título da tarefa')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar tarefa/i })).toBeInTheDocument()
  })

  it('renders form for editing task', () => {
    render(
      <TaskForm task={mockTask} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    )

    expect(screen.getByText('Editar Tarefa')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /atualizar tarefa/i })).toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    render(
      <TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    )

    fireEvent.change(screen.getByPlaceholderText('Digite o título da tarefa'), {
      target: { value: 'New Task' },
    })
    fireEvent.change(screen.getByPlaceholderText('Digite uma descrição (opcional)'), {
      target: { value: 'New description' },
    })
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'high' },
    })

    fireEvent.click(screen.getByRole('button', { name: /criar tarefa/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'New description',
        priority: 'high',
        dueDate: undefined,
      })
    })
  })

  it('does not submit form with empty title', () => {
    render(
      <TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    )

    fireEvent.click(screen.getByRole('button', { name: /criar tarefa/i }))

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    )

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('calls onCancel when close button is clicked', () => {
    render(
      <TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    )

    const closeButton = screen.getByRole('button', { name: '' })
    fireEvent.click(closeButton)
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('handles due date input', async () => {
    render(
      <TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    )

    const dueDateInput = screen.getByLabelText(/data de vencimento/i)
    fireEvent.change(dueDateInput, {
      target: { value: '2023-12-31' },
    })

    fireEvent.change(screen.getByPlaceholderText('Digite o título da tarefa'), {
      target: { value: 'Task with due date' },
    })

    fireEvent.click(screen.getByRole('button', { name: /criar tarefa/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Task with due date',
        description: undefined,
        priority: 'medium',
        dueDate: new Date('2023-12-31T00:00:00'),
      })
    })
  })
})
