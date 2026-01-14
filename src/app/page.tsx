'use client';

import { AddTaskForm } from '../components/tasks/AddTaskForm';
import { TaskList } from '../components/tasks/TaskList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>

        <AddTaskForm />
        <TaskList />
      </div>
    </div>
  );
}
