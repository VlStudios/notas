import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Note, Category, Employee } from '../types';

interface Props {
  notes: Note[];
  categories: Category[];
  employees: Employee[];
  onDeleteNote: (id: string) => void;
}

export default function NoteList({ notes, categories, employees, onDeleteNote }: Props) {
  const getCategoryColor = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.color || '#gray';
  };

  const getEmployeeName = (employeeId: string) => {
    return employees.find(emp => emp.id === employeeId)?.name || 'N/A';
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getCategoryColor(note.category) }}
              />
              <span className="font-medium">
                {categories.find(cat => cat.id === note.category)?.name}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                R$ {note.value.toFixed(2)}
              </span>
              <span className="text-sm text-gray-600">
                {formatDateTime(note.timestamp)}
              </span>
            </div>
            
            <div className="text-sm text-gray-600">
              Funcionário: {getEmployeeName(note.employeeId)}
            </div>
          </div>

          <button
            onClick={() => onDeleteNote(note.id)}
            className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      {notes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma nota registrada ainda.
        </div>
      )}
    </div>
  );
}