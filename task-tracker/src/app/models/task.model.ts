export interface Task {
  id: string;
  title: string;
  employee: string;
  description: string;
  deadline: string;
  priority: string;
  status: string;
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum Status {
  InProgress = 'in progress',
  Review = 'review',
  ToDo = 'to do',
  Done = 'done',
}
