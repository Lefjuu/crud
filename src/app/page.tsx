"use client";

import { AddTaskForm } from "../components/tasks/AddTaskForm";
import { TaskList } from "../components/tasks/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md shadow-gray-900/20 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Task Manager
        </h1>

        <AddTaskForm />
        <TaskList />
      </div>
    </div>
  );
}
