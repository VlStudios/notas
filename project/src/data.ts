import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    type: 'free',
    name: 'Grátis',
    notesPerDay: 10,
    price: 0
  },
  {
    type: 'pro',
    name: 'Profissional',
    notesPerDay: 50,
    price: 29.90
  },
  {
    type: 'business',
    name: 'Empresarial',
    notesPerDay: 999,
    price: 89.90
  }
];