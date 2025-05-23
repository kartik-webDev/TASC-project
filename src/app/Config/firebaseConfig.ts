import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDMfMt_dsrExfNc8FvnBSTjPJP6vpdArIg",
  authDomain: "tasc-0525.firebaseapp.com",
  projectId: "tasc-0525",
  storageBucket: "tasc-0525.firebasestorage.app",
  messagingSenderId: "653791844445",
  appId: "1:653791844445:web:1af17eb48c955a6007d5b4",
  measurementId: "G-PJWH00RJJZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // ✅ Ensure provider is initialized

export { auth, provider };