import { ReactNode } from 'react';

export interface ModuleItem {
  id: string;
  type: 'video' | 'pdf' | 'quiz' | 'assignment' | string;
  title: string;
  duration?: string;
  size?: string;
  questions?: number;
  dueDate?: string;
  completed: boolean;
}

export interface Module {
  id: number;
  title: string;
  isOpen: boolean;
  items: ModuleItem[];
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  image: string;
  date?: string; // For upcoming courses
  modules: Module[];
}

export interface Project {
  id: number;
  name: string;
  tool: string;
  status: 'active' | 'paused' | 'error';
  executions: number;
  successRate: number;
  lastRun: string;
  moduleId: number;
  courseId: number;
  description?: string;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  type: 'update' | 'alert' | 'event' | 'reminder';
  priority: 'low' | 'medium' | 'high';
}

export interface Message {
  id: number;
  folder: string;
  sender: string;
  email: string;
  role: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  unread: boolean;
  avatar: string;
}

export interface CalendarEvent {
  id?: number;
  day: number;
  title: string;
  type: 'quiz' | 'live' | 'assignment' | 'google' | 'personal';
  time: string;
  notes: string;
  platform?: string;
  duration?: string;
}

export interface NotificationItem {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  moduleId?: number;
}

export interface Competency {
  id: string;
  title: string;
  icon: ReactNode;
  color: string;
  progress: number;
  level: string;
  projects: number;
  tasks: { id: number; name: string; completed: boolean }[];
}

export interface Session {
  id: number;
  title: string;
  instructor: string;
  date: string;
  month: string;
  day: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'past';
  platform: string;
}