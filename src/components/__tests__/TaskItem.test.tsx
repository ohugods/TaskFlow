import { Task } from '@/types/task'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TaskItem } from '../TaskItem'

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test description',
  completed: false,
  priority: 'medium',
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
}

describe('TaskItem', () => {
  const mockOnToggle = vi.fn()
  const mockOnDelete = vi.fn()
  const mockOnEdit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders task information correctly', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Média')).toBeInTheDocument()
  })

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const checkbox = screen.getByRole('button')
    fireEvent.click(checkbox)

    expect(mockOnToggle).toHaveBeenCalledWith('1')
  })

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /excluir tarefa/i })
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('calls onEdit when edit button is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const editButton = screen.getByRole('button', { name: /editar tarefa/i })
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith(mockTask)
  })

  it('shows completed state correctly', () => {
    const completedTask = { ...mockTask, completed: true }
    
    render(
      <TaskItem
        task={completedTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const title = screen.getByText('Test Task')
    expect(title).toHaveClass('line-through')
  })

  it('displays due date when provided', () => {
    const taskWithDueDate = {
      ...mockTask,
      dueDate: new Date('2023-12-31T00:00:00'),
    }

    render(
      <TaskItem
        task={taskWithDueDate}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText('31/12/2023')).toBeInTheDocument()
  })
})
