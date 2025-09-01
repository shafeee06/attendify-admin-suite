export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedBatches: string[];
  username: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface Batch {
  id: string;
  name: string;
  students: number;
}

export interface AttendanceRecord {
  id: string;
  trainerId: string;
  trainerName: string;
  batchId: string;
  batchName: string;
  date: string;
  present: number;
  absent: number;
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'trainer';
}