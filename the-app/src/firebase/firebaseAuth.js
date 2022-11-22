import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  } from "firebase/auth"
import { auth } from "./firebase"


    
  //обработка  подписки
  export const signUp = async (email, pass) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  };
  //обработка авторизации
  export const logIn = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };
  //обработка разлогинивания
  export const logOut = async () => {
    await signOut(auth);
    console.log("out");
  };

  export const reauthenticate = async (password) => {
    
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    )
    const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
    )
    return result
  }
  