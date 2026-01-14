import { PrismaClient, Task } from '../../generated/prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({ adapter });

export interface CreateTaskData {
  title: string;
}

export interface UpdateTaskData {
  title?: string;
  completed?: boolean;
}

export class TaskService {
  static async getAllTasks(): Promise<Task[]> {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getTaskById(id: number): Promise<Task | null> {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  static async createTask(data: CreateTaskData): Promise<Task> {
    return prisma.task.create({
      data: {
        title: data.title.trim(),
      },
    });
  }

  static async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    const updateData: Record<string, string | boolean> = {};
    if (data.title !== undefined) {
      updateData.title = data.title.trim();
    }
    if (data.completed !== undefined) {
      updateData.completed = data.completed;
    }

    return prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  static async deleteTask(id: number): Promise<void> {
    await prisma.task.delete({
      where: { id },
    });
  }

  static async toggleTaskCompletion(id: number): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    return this.updateTask(id, { completed: !task.completed });
  }
}