"use client";

import React from "react";
import { Task } from "@/lib/types";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="mr-2"
        />
        <span className={task.completed ? "line-through" : ""}>
          {task.task}
        </span>
      </div>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
