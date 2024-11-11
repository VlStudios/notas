import React, { useState } from 'react';
import { LayoutDashboard, Receipt, Tags, CreditCard, Users, LogOut } from 'lucide-react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import CategoryForm from './CategoryForm';
import PlanCard from './PlanCard';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import { useFirestore } from '../hooks/useFirestore';
import { PLANS } from '../data';
import type { PlanType, Department, Company, Employee } from '../types';

interface Props {
  company: Company | null;
  employee: Employee | null;
  onLogout: () => void;
}

export default function Dashboard({ company, employee, onLogout }: Props) {
  const {
    notes,
    categories,
    employees,
    loading: firestoreLoading,
    addNote,
    deleteNote,
    addCategory,
    addEmployee,
    toggleEmployee
  } = useFirestore();

  const [departments] = useState<Department[]>([
    { id: '1', name: 'Vendas' },
    { id: '2', name: 'Marketing' },
    { id: '3', name: 'Financeiro' },
    { id: '4', name: 'RH' }
  ]);

  const [activeTab, setActiveTab] = useState<'notes' | 'categories' | 'plans' | 'employees'>('notes');

  const plan = PLANS.find(p => p.type === (company?.planType || 'free'))!;
  const notesToday = notes.filter(note => 
    note.timestamp.toDateString() === new Date().toDateString()
  ).length;

  if (firestoreLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Receipt className="h-8 w-8 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900">Sistema de Notas Financeiras</h1>
            </div>
            <div className="flex items-center gap-4">
              {company && (
                <div className="text-sm text-gray-600">
                  <span>Plano atual: </span>
                  <span className="font-semibold text-blue-500">{plan.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {company ? company.name : employee?.name}
                </span>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'notes' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard size={20} />
            Notas
          </button>

          {company && (
            <>
              <button
                onClick={() => setActiveTab('employees')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'employees' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users size={20} />
                Funcionários
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'categories' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Tags size={20} />
                Categorias
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'plans' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard size={20} />
                Planos
              </button>
            </>
          )}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'notes' && (
            <>
              <NoteForm
                categories={categories}
                employees={employees}
                onAddNote={addNote}
                remainingNotes={plan.notesPerDay - notesToday}
              />
              <NoteList
                notes={notes}
                categories={categories}
                employees={employees}
                onDeleteNote={deleteNote}
              />
            </>
          )}

          {company && activeTab === 'employees' && (
            <>
              <EmployeeForm
                departments={departments}
                onAddEmployee={addEmployee}
              />
              <EmployeeList
                employees={employees}
                departments={departments}
                onToggleEmployee={toggleEmployee}
              />
            </>
          )}

          {company && activeTab === 'categories' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Gerenciar Categorias</h2>
              <CategoryForm onAddCategory={addCategory} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div
                    key={category.id}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {company && activeTab === 'plans' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.map(plan => (
                <PlanCard
                  key={plan.type}
                  plan={plan}
                  isActive={company.planType === plan.type}
                  onSelect={() => {/* Implement plan change */}}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}