import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyADNTpstJflPEimwc_eaU2-AzUqpbD1fUU",
  authDomain: "studentgaterestrictionsystem.firebaseapp.com",
  databaseURL: "https://studentgaterestrictionsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studentgaterestrictionsystem",
  storageBucket: "studentgaterestrictionsystem.firebasestorage.app",
  messagingSenderId: "508361979629",
  appId: "1:508361979629:web:f9414c50cbf8b667fdbee4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);