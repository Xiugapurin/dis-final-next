import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC66QpP4wdo5bF3GH3SvLnUvDF8sKaAQn8",
  authDomain: "final-project-445001.firebaseapp.com",
  projectId: "final-project-445001",
  storageBucket: "final-project-445001.firebasestorage.app",
  messagingSenderId: "503510295785",
  appId: "1:503510295785:web:aa1545dd9686e4249cfc78",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
