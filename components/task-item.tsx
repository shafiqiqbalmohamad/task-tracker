import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Task } from '@/lib/types'

interface TaskItemProps {
  task: Task
  onToggle: () => void
  onDelete: () => void
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center space-x-2">
      <Checkbox
        checked={task.completed}
        onCheckedChange={onToggle}
        id={task.id}
      />
      <label
        htmlFor={task.id}
        className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
      >
        {task.text}
      </label>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  )
}

