import React, { useState } from 'react';
import CompanyLogin from './components/auth/CompanyLogin';
import CompanySignUp from './components/auth/CompanySignUp';
import EmployeeLogin from './components/auth/EmployeeLogin';
import Dashboard from './components/Dashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const {
    company,
    employee,
    loading,
    error,
    loginCompany,
    loginEmployee,
    signUpCompany,
    logout
  } = useAuth();

  const [authMode, setAuthMode] = useState<'company-login' | 'company-signup' | 'employee-login'>('company-login');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!company && !employee) {
    switch (authMode) {
      case 'company-login':
        return (
          <CompanyLogin
            onLogin={loginCompany}
            error={error}
            onSwitchToSignUp={() => setAuthMode('company-signup')}
            onSwitchToEmployeeLogin={() => setAuthMode('employee-login')}
          />
        );
      case 'company-signup':
        return (
          <CompanySignUp
            onSignUp={signUpCompany}
            error={error}
            onSwitchToLogin={() => setAuthMode('company-login')}
          />
        );
      case 'employee-login':
        return (
          <EmployeeLogin
            onLogin={loginEmployee}
            error={error}
            onSwitchToCompanyLogin={() => setAuthMode('company-login')}
          />
        );
    }
  }

  return <Dashboard company={company} employee={employee} onLogout={logout} />;
}