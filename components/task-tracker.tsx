"use client";

import React, { useState } from "react";
import TaskItem from "./task-item";
import type { Task } from "../lib/types";
import { supabase } from "../lib/supabaseClient";

interface TaskTrackerProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onFetch: () => Promise<void>;
}

const TaskTracker = ({
  tasks,
  isLoading,
  error,
  onFetch,
}: TaskTrackerProps) => {
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = async () => {
    if (newTaskText.trim()) {
      const { error: supabaseError } = await supabase
        .from("tasks")
        .insert([{ task: newTaskText, completed: false }]);

      if (supabaseError) {
        console.error("Error adding task:", supabaseError);
        return;
      }

      setNewTaskText("");
      onFetch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTaskText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTaskText(e.target.value)
          }
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border rounded border-[#0066cc]"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={async () => {
              const { error: supabaseError } = await supabase
                .from("tasks")
                .update({ completed: !task.completed })
                .eq("id", task.id);

              if (supabaseError) {
                console.error("Error updating task:", supabaseError);
                return;
              }

              onFetch();
            }}
            onDelete={async () => {
              const { error: supabaseError } = await supabase
                .from("tasks")
                .delete()
                .eq("id", task.id);

              if (supabaseError) {
                console.error("Error deleting task:", supabaseError);
                return;
              }

              onFetch();
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
