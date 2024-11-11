import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBcXqYSeZtIayfYGQ_18oaKst1f7w3VzC0",
  authDomain: "larscanner-142ba.firebaseapp.com",
  databaseURL: "https://larscanner-142ba-default-rtdb.firebaseio.com",
  projectId: "larscanner-142ba",
  storageBucket: "larscanner-142ba.firebasestorage.app",
  messagingSenderId: "711584292312",
  appId: "1:711584292312:web:6fb955dd639ba25d69e6ad",
  measurementId: "G-DZH7LB5RWD"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);