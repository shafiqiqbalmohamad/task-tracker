import TaskTracker from '@/components/task-tracker'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>
      <TaskTracker />
    </main>
  )
}

