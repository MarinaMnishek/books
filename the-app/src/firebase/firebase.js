import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp)

const userId = auth.currentUser?.uid;
export const docRef = doc(db, "users", `${userId}`);