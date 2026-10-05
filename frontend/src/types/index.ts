export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export type TaskStatus = 'not_started' | 'in_progress' | 'submitted' | 'graded';

export interface Task {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  deadline: string; // ISO date
  status: TaskStatus;
  type: 'lab' | 'homework';
  grade?: number;
}

export interface Course {
  id: string;
  name: string;
  teacher: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AccessRight {
  userId: string;
  courseId: string;
  canEdit: boolean;
  canView: boolean;
}