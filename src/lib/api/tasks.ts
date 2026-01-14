import axios from 'axios';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
}

export interface UpdateTaskData {
  title?: string;
  completed?: boolean;
}

const api = axios.create({
  baseURL: '/api',
});

export const tasksApi = {
  getAll: () => api.get<Task[]>('/tasks').then(res => res.data),

  create: (data: CreateTaskData) =>
    api.post<Task>('/tasks', data).then(res => res.data),

  update: (id: number, data: UpdateTaskData) =>
    api.put<Task>(`/tasks/${id}`, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`/tasks/${id}`).then(() => undefined),
};