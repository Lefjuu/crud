"use client";

import { useState } from "react";
import { useUpdateTask, useDeleteTask } from "../../hooks/useTasks";
import type { Task } from "../../lib/api/tasks";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleToggleComplete = async () => {
    try {
      await updateTask.mutateAsync({
        id: task.id,
        data: { completed: !task.completed },
      });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    try {
      await updateTask.mutateAsync({
        id: task.id,
        data: { title: editTitle.trim() },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask.mutateAsync(task.id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-lg bg-gray-800">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        disabled={updateTask.isPending}
        className="w-5 h-5 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-400"
      />

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            disabled={updateTask.isPending}
          />
          <button
            onClick={handleSaveEdit}
            disabled={updateTask.isPending || !editTitle.trim()}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            disabled={updateTask.isPending}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 text-white ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            disabled={updateTask.isPending || deleteTask.isPending}
            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded disabled:opacity-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={updateTask.isPending || deleteTask.isPending}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded disabled:opacity-50"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
