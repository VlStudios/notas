export interface Note {
  id: string;
  value: number;
  employeeId: string;
  category: string;
  timestamp: Date;
  companyId: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  companyId: string;
}

export type PlanType = 'free' | 'pro' | 'business';

export interface Plan {
  type: PlanType;
  name: string;
  notesPerDay: number;
  price: number;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  planType: PlanType;
  active: boolean;
  createdAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  active: boolean;
  companyId: string;
}

export interface Department {
  id: string;
  name: string;
}