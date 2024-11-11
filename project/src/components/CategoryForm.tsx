import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Category } from '../types';

interface Props {
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

export default function CategoryForm({ onAddCategory }: Props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAddCategory({ name, color });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nova categoria..."
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-12 h-10 rounded cursor-pointer"
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <PlusCircle size={20} />
        Adicionar
      </button>
    </form>
  );
}