import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { Category, Employee } from '../types';

interface Props {
  categories: Category[];
  employees: Employee[];
  onAddNote: (note: { value: number; employeeId: string; category: string }) => void;
  remainingNotes: number;
}

export default function NoteForm({ categories, employees, onAddNote, remainingNotes }: Props) {
  const [value, setValue] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || !employeeId || !category) return;

    onAddNote({
      value: parseFloat(value),
      employeeId,
      category
    });

    setValue('');
    setEmployeeId('');
    setCategory('');
  };

  const activeEmployees = employees.filter(emp => emp.active);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="text-right mb-4">
        <span className="text-sm text-gray-600">
          Notas restantes hoje: <strong>{remainingNotes}</strong>
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0,00"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Funcionário
          </label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione um funcionário</option>
            {activeEmployees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} - {employee.role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={remainingNotes === 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
      >
        <Save size={20} />
        Salvar Nota
      </button>
    </form>
  );
}