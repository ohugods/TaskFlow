import { Task } from '@/types/task'
import { isDueToday, isOverdue } from '@/utils/dateUtils'
import { AlertTriangle, Calendar, CheckCircle, Circle } from 'lucide-react'

interface TaskStatsProps {
  tasks: Task[]
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const pending = total - completed
  const overdue = tasks.filter((task) => 
    task.dueDate && !task.completed && isOverdue(new Date(task.dueDate))
  ).length
  const dueToday = tasks.filter((task) => 
    task.dueDate && !task.completed && isDueToday(new Date(task.dueDate))
  ).length

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const stats = [
    {
      label: 'Total',
      value: total,
      icon: Circle,
      color: 'text-gray-600 bg-gray-100',
    },
    {
      label: 'Concluídas',
      value: completed,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'Pendentes',
      value: pending,
      icon: Circle,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Atrasadas',
      value: overdue,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100',
    },
    {
      label: 'Vencem Hoje',
      value: dueToday,
      icon: Calendar,
      color: 'text-orange-600 bg-orange-100',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h3 className="font-medium text-gray-900 mb-3">Progresso</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Concluídas</span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card p-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
