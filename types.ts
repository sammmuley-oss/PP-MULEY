
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  timestamp: number;
  status: 'new' | 'read' | 'contacted';
}

export interface User {
  id: string;
  username: string;
  role: 'admin';
}

export enum StorageKeys {
  SERVICES = 'ppm_services',
  PROJECTS = 'ppm_projects',
  LEADS = 'ppm_leads',
  AUTH = 'ppm_auth'
}
