import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "seraphic-bliss-428109-n1.firebaseapp.com",
  projectId: "seraphic-bliss-428109-n1",
  storageBucket: "seraphic-bliss-428109-n1.firebasestorage.app",
  messagingSenderId: "195196305269",
  appId: "1:195196305269:web:e2f816a7c7b7a273f45d3c",
  measurementId: "G-3365MES581",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
