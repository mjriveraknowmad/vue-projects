export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Task {
    id: string;
    name: string;
    completeAt?: Date;
}