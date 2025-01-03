"use client";

import { useState, useEffect } from "react";
import TaskTracker from "@/components/task-tracker";
import { supabase } from "../lib/supabaseClient";
import { Task } from "@/lib/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      setTasks(data || []);
    } catch (e) {
      setError("Failed to fetch tasks");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#0066cc]">Task Tracker</h1>
      <TaskTracker
        tasks={tasks}
        isLoading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </main>
  );
}
