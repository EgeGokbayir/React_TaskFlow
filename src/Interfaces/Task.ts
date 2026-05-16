export type TaskStatus = 'beklemede' | 'tamamlandi';
export type TaskPriority = 'dusuk' | 'orta' | 'yuksek';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  dueDate: string;
}
