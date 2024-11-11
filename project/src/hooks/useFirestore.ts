import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Note, Category, Employee } from '../types';

export function useFirestore() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to notes collection
    const notesQuery = query(collection(db, 'notes'), orderBy('timestamp', 'desc'));
    const unsubNotes = onSnapshot(notesQuery, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      })) as Note[];
      setNotes(notesData);
    });

    // Subscribe to categories collection
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategories(categoriesData);
    });

    // Subscribe to employees collection
    const unsubEmployees = onSnapshot(collection(db, 'employees'), (snapshot) => {
      const employeesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Employee[];
      setEmployees(employeesData);
    });

    setLoading(false);

    return () => {
      unsubNotes();
      unsubCategories();
      unsubEmployees();
    };
  }, []);

  const addNote = async (noteData: Omit<Note, 'id' | 'timestamp'>) => {
    try {
      await addDoc(collection(db, 'notes'), {
        ...noteData,
        timestamp: Timestamp.fromDate(new Date())
      });
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  };

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    try {
      await addDoc(collection(db, 'categories'), categoryData);
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const addEmployee = async (employeeData: Omit<Employee, 'id' | 'active'>) => {
    try {
      await addDoc(collection(db, 'employees'), {
        ...employeeData,
        active: true
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  };

  const toggleEmployee = async (id: string) => {
    try {
      const employee = employees.find(emp => emp.id === id);
      if (employee) {
        await updateDoc(doc(db, 'employees', id), {
          active: !employee.active
        });
      }
    } catch (error) {
      console.error('Error toggling employee:', error);
      throw error;
    }
  };

  return {
    notes,
    categories,
    employees,
    loading,
    addNote,
    deleteNote,
    addCategory,
    addEmployee,
    toggleEmployee
  };
}