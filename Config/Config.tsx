import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCX0FnufcWhC-LfjldIvUnkSmlO0dbcOc4",
  authDomain: "insectos-ac86b.firebaseapp.com",
  databaseURL: "https://insectos-ac86b-default-rtdb.firebaseio.com",
  projectId: "insectos-ac86b",
  storageBucket: "insectos-ac86b.firebasestorage.app",
  messagingSenderId: "480124298389",
  appId: "1:480124298389:web:51e977a76d3d6afc88279c",
  measurementId: "G-6K2HV3YQG4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

