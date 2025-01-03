'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TaskItem from '@/components/task-item'
import { Task } from '@/lib/types'
import { generateId } from '@/lib/utils'

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')

  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks([...tasks, { id: generateId(), text: newTaskText, completed: false }])
      setNewTaskText('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0
    return a.completed ? 1 : -1
  })

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Add a new task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <ul className="space-y-2">
        {sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  )
}

