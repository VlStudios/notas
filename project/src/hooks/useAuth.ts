import { useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  type User 
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import type { Company, Employee } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          // Check if it's a company
          const companyDoc = await getDoc(doc(db, 'companies', user.uid));
          if (companyDoc.exists()) {
            setCompany({ id: companyDoc.id, ...companyDoc.data() } as Company);
            setEmployee(null);
          } else {
            // Check if it's an employee
            const employeeDoc = await getDoc(doc(db, 'employees', user.uid));
            if (employeeDoc.exists()) {
              setEmployee({ id: employeeDoc.id, ...employeeDoc.data() } as Employee);
              setCompany(null);
            }
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      } else {
        setCompany(null);
        setEmployee(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const loginCompany = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Credenciais inválidas');
      throw err;
    }
  };

  const loginEmployee = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Credenciais inválidas');
      throw err;
    }
  };

  const signUpCompany = async (data: { name: string; email: string; password: string }) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // Create company document
      await setDoc(doc(db, 'companies', userCredential.user.uid), {
        name: data.name,
        email: data.email,
        planType: 'free',
        active: true,
        createdAt: new Date()
      });

      // Create initial categories collection for the company
      const categoriesRef = collection(db, `companies/${userCredential.user.uid}/categories`);
      await setDoc(doc(categoriesRef), {
        name: 'Geral',
        color: '#3B82F6',
        createdAt: new Date()
      });

    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
      throw err;
    }
  };

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'active'>) => {
    if (!company) throw new Error('No company authenticated');

    try {
      // Create auth account for employee
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        employeeData.email, 
        'senha123' // Temporary password
      );

      // Create employee document
      await setDoc(doc(db, 'employees', userCredential.user.uid), {
        ...employeeData,
        companyId: company.id,
        active: true
      });

      return userCredential.user.uid;
    } catch (err) {
      console.error('Error creating employee:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out:', err);
      throw err;
    }
  };

  return {
    user,
    company,
    employee,
    loading,
    error,
    loginCompany,
    loginEmployee,
    signUpCompany,
    createEmployee,
    logout
  };
}