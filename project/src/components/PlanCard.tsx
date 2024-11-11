import React from 'react';
import { Check } from 'lucide-react';
import type { Plan } from '../types';

interface Props {
  plan: Plan;
  isActive?: boolean;
  onSelect: () => void;
}

export default function PlanCard({ plan, isActive, onSelect }: Props) {
  return (
    <div className={`
      p-6 rounded-xl shadow-lg transition-all
      ${isActive ? 'bg-blue-500 text-white scale-105' : 'bg-white hover:scale-102'}
    `}>
      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">
          {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
        </span>
        {plan.price > 0 && <span className="text-sm">/mês</span>}
      </div>
      
      <ul className="mb-6 space-y-2">
        <li className="flex items-center gap-2">
          <Check size={20} />
          {plan.notesPerDay} notas por dia
        </li>
        <li className="flex items-center gap-2">
          <Check size={20} />
          Categorias ilimitadas
        </li>
        <li className="flex items-center gap-2">
          <Check size={20} />
          Exportação de relatórios
        </li>
      </ul>

      <button
        onClick={onSelect}
        className={`
          w-full py-2 px-4 rounded-lg font-medium transition-colors
          ${isActive 
            ? 'bg-white text-blue-500 hover:bg-gray-100' 
            : 'bg-blue-500 text-white hover:bg-blue-600'}
        `}
      >
        {isActive ? 'Plano Atual' : 'Selecionar Plano'}
      </button>
    </div>
  );
}