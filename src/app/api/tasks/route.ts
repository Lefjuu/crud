import { NextRequest, NextResponse } from 'next/server';
import { TaskService } from '../../../lib/services/taskService';

export async function GET() {
  try {
    const tasks = await TaskService.getAllTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'Title is required and must be a non-empty string' }, { status: 400 });
    }

    const task = await TaskService.createTask({ title });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, completed } = await request.json();

    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'Valid id is required' }, { status: 400 });
    }

    const updateData: Record<string, string | boolean> = {};
    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return NextResponse.json({ error: 'Title must be a non-empty string' }, { status: 400 });
      }
      updateData.title = title;
    }
    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return NextResponse.json({ error: 'Completed must be a boolean' }, { status: 400 });
      }
      updateData.completed = completed;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'At least one field to update is required' }, { status: 400 });
    }

    const task = await TaskService.updateTask(id, updateData);
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    if (error instanceof Error && error.message === 'Task not found') {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'Valid id is required' }, { status: 400 });
    }

    await TaskService.deleteTask(id);
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    if (error instanceof Error && error.message === 'Task not found') {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}