import type { User, Task, Course, Notification } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Иван Иванов', email: 'ivan@example.com', role: 'student' },
  { id: '2', name: 'Петр Петров', email: 'petr@example.com', role: 'student' },
  { id: '3', name: 'Анна Смирнова', email: 'anna@example.com', role: 'teacher' },
];

export const mockCourses: Course[] = [
  { id: 'c1', name: 'Программирование', teacher: 'Анна Смирнова' },
  { id: 'c2', name: 'Базы данных', teacher: 'Анна Смирнова' },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Лабораторная №1: Основы React',
    description: 'Создать SPA-приложение...',
    courseId: 'c1',
    courseName: 'Программирование',
    deadline: '2026-10-05T23:59:00',
    status: 'in_progress',
    type: 'lab',
  },
  {
    id: 't2',
    title: 'Домашнее задание: SQL-запросы',
    description: 'Написать 10 запросов...',
    courseId: 'c2',
    courseName: 'Базы данных',
    deadline: '2026-09-30T23:59:00',
    status: 'not_started',
    type: 'homework',
  },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'Новое задание', message: 'Добавлена лаба по React', date: '2026-09-20', read: false },
  { id: 'n2', title: 'Дедлайн близко', message: 'Сдать SQL до 30 сентября', date: '2026-09-20', read: false },
];