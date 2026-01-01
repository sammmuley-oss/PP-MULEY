import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmKdY3wuG9pTe5NzWM1Tg8DqiwJq_zACs",
  authDomain: "pp-muley-company.firebaseapp.com",
  projectId: "pp-muley-company",
  storageBucket: "pp-muley-company.appspot.com",
  messagingSenderId: "1050419624736",
  appId: "1:1050419624736:web:8471640e1e6cc007f33545",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

// ⭐ THIS WAS MISSING ⭐
export const storage = getStorage(app);
