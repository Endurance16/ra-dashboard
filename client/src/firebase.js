import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8PiGXwNHKTfRn7GVIcuSalglJvORaOs8",
  authDomain: "ra-dashboard-1d700.firebaseapp.com",
  projectId: "ra-dashboard-1d700",
  storageBucket: "ra-dashboard-1d700.firebasestorage.app",
  messagingSenderId: "554031582439",
  appId: "1:554031582439:web:fc4cc74078d01e36ac6642"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
