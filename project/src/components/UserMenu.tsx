import React from 'react';
import { LogOut, User } from 'lucide-react';
import type { Employee } from '../types';

interface Props {
  employee: Employee;
  onLogout: () => Promise<void>;
}

export default function UserMenu({ employee, onLogout }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-gray-500" />
        <span className="text-sm text-gray-700">{employee.name}</span>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
      >
        <LogOut className="h-4 w-4" />
        Sair
      </button>
    </div>
  );
}