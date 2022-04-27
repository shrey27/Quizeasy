import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsUx8D0hKtJWaFuJcCCfX8l8tkaLV66dE",
  authDomain: "neogcamp-ce308.firebaseapp.com",
  projectId: "neogcamp-ce308",
  storageBucket: "neogcamp-ce308.appspot.com",
  messagingSenderId: "436647397068",
  appId: "1:436647397068:web:14e2d54344bcfe86a2a469"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);