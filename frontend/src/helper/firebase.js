// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-blog-app-6a1a8.firebaseapp.com",
  projectId: "mern-blog-app-6a1a8",
  storageBucket: "mern-blog-app-6a1a8.firebasestorage.app",
  messagingSenderId: "544033849027",
  appId: "1:544033849027:web:483f2b7878c2951b27ac76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
