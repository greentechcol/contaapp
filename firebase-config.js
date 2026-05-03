import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, deleteDoc, query, orderBy, writeBatch } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRcdPOgC3jU4Br81r3lC5KK2ZowBSns80",
  authDomain: "contaappgreentech.firebaseapp.com",
  projectId: "contaappgreentech",
  storageBucket: "contaappgreentech.firebasestorage.app",
  messagingSenderId: "672661191582",
  appId: "1:672661191582:web:babf8b97b69925028eb48f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar a window para compatibilidad con el código existente mientras se migra
window.__FB = { 
  auth, db, GoogleAuthProvider, signInWithPopup, 
  signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  onAuthStateChanged, signOut, doc, getDoc, setDoc, 
  onSnapshot, collection, deleteDoc, query, orderBy, writeBatch 
};
window.__fbReady = true;
window.dispatchEvent(new Event('firebase-ready'));

export { auth, db };
