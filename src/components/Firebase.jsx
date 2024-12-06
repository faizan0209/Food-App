import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, getDocs,getDoc } from "firebase/firestore";
import { getStorage,ref, uploadBytes, getDownloadURL   } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBY7tPnw0OHTKNt18Oan4CkzJYg730gdPk",
  authDomain: "foodapp-9119a.firebaseapp.com",
  projectId: "foodapp-9119a",
  storageBucket: "foodapp-9119a.appspot.com",
  messagingSenderId: "171887731700",
  appId: "1:171887731700:web:b647e9be68d7784e92cfa1",
  measurementId: "G-BVQ96T50MH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app)

export { auth, db, storage , ref, uploadBytes, getDownloadURL, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc, deleteDoc, doc, updateDoc, getDocs,getDoc,onAuthStateChanged };
