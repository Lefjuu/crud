"use client";

import { useState } from "react";
import { useCreateTask } from "../../hooks/useTasks";

export function AddTaskForm() {
  const [title, setTitle] = useState("");
  const createTask = useCreateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask.mutateAsync({ title: title.trim() });
      setTitle("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
          disabled={createTask.isPending}
        />
        <button
          type="submit"
          disabled={createTask.isPending || !title.trim()}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg"
        >
          {createTask.isPending ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}
