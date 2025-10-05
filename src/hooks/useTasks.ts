/**
 * @fileoverview Custom hook for managing task state and persistence.
 * Handles all CRUD operations for tasks with localStorage persistence,
 * providing a clean API for task management throughout the application.
 */

import { Task, TaskFormData } from '@/types/task'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// localStorage key for persisting tasks
const STORAGE_KEY = 'task-manager-tasks'

/**
 * Custom hook that provides comprehensive task management functionality.
 * Handles state management, persistence, and all CRUD operations for tasks.
 *
 * @returns Object containing tasks state and management functions
 */
export const useTasks = () => {
  // State management for tasks and loading status
  const [tasks, setTasks] = useState<Task[]>([]) // Current tasks array
  const [loading, setLoading] = useState(true) // Initial loading state

  /**
   * Effect to load tasks from localStorage on component mount.
   * Parses stored JSON and converts date strings back to Date objects.
   * Handles errors gracefully and shows user feedback.
   */
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY)
      if (storedTasks) {
        // Parse JSON and convert date strings to Date objects
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }))
        setTasks(parsedTasks)
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
      toast.error('Erro ao carregar tarefas')
    } finally {
      setLoading(false) // Always set loading to false
    }
  }, [])

  /**
   * Internal function to save tasks to localStorage and update state.
   * Handles serialization and error management for persistence.
   */
  const saveTasks = useCallback((newTasks: Task[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
      setTasks(newTasks)
    } catch (error) {
      console.error('Error saving tasks:', error)
      toast.error('Erro ao salvar tarefas')
    }
  }, [])

  /**
   * Creates a new task with generated ID and timestamps.
   * @param taskData - Form data for the new task
   * @returns The newly created task object
   */
  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(), // Generate unique ID
      ...taskData,
      completed: false, // New tasks start as pending
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedTasks = [...tasks, newTask]
    saveTasks(updatedTasks)
    toast.success('Tarefa criada com sucesso!')
    return newTask
  }, [tasks, saveTasks])

  /**
   * Updates an existing task with new data and updates timestamp.
   * @param id - Task ID to update
   * @param updates - Partial updates to apply
   */
  const updateTask = useCallback((id: string, updates: Partial<TaskFormData>) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date() } // Update timestamp
        : task
    )
    saveTasks(updatedTasks)
    toast.success('Tarefa atualizada com sucesso!')
  }, [tasks, saveTasks])

  /**
   * Toggles the completion status of a task.
   * @param id - Task ID to toggle
   */
  const toggleTask = useCallback((id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    )
    saveTasks(updatedTasks)
    const task = tasks.find((t) => t.id === id)
    toast.success(
      task?.completed ? 'Tarefa marcada como pendente' : 'Tarefa concluída!'
    )
  }, [tasks, saveTasks])

  /**
   * Removes a task from the tasks list.
   * @param id - Task ID to delete
   */
  const deleteTask = useCallback((id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    saveTasks(updatedTasks)
    toast.success('Tarefa removida com sucesso!')
  }, [tasks, saveTasks])

  /**
   * Removes all completed tasks from the list.
   * Useful for cleaning up finished tasks.
   */
  const clearCompleted = useCallback(() => {
    const updatedTasks = tasks.filter((task) => !task.completed)
    saveTasks(updatedTasks)
    toast.success('Tarefas concluídas removidas!')
  }, [tasks, saveTasks])

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  }
}
