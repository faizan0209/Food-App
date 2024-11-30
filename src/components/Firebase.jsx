import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { getStorage,ref, uploadBytes, getDownloadURL   } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBY7tPnw0OHTKNt18Oan4CkzJYg730gdPk",
  authDomain: "foodapp-9119a.firebaseapp.com",
  projectId: "foodapp-9119a",
  storageBucket: "foodapp-9119a.appspot.com",
  messagingSenderId: "171887731700",
  appId: "1:171887731700:web:b647e9be68d7784e92cfa1",
  measurementId: "G-BVQ96T50MH"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

const storage = getStorage(app)

export { auth, db, storage , ref, uploadBytes, getDownloadURL, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc, deleteDoc, doc, updateDoc, getDocs };
