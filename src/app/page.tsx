"use client";

import Link from "next/link";
import { AddTaskForm } from "../components/tasks/AddTaskForm";
import { TaskList } from "../components/tasks/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md shadow-gray-900/20 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Task Manager</h1>
          <Link
            href="/api-docs"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            API Docs
          </Link>
        </div>

        <AddTaskForm />
        <TaskList />
      </div>
    </div>
  );
}
