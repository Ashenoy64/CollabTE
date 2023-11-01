// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBFJfF-65jY3tVu0SLxx7IVqGFKK2vqyfI",
  authDomain: "collabte-87933.firebaseapp.com",
  projectId: "collabte-87933",
  storageBucket: "collabte-87933.appspot.com",
  messagingSenderId: "17972686438",
  appId: "1:17972686438:web:dc6d47585db806b23687a7",
  measurementId: "G-LQTY6FXM75"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)


export const GoogleSignIn  = ()=>{
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth,provider)
}

export const LogOut = ()=>{
  return signOut(auth)
}


export const CreateNewUser = (email,password)=>{
  return createUserWithEmailAndPassword(auth,email,password)
     
}

export const SignInWithEmail = (email,password)=>{
  return signInWithEmailAndPassword(auth, email, password)
}

export const GetCurrentUser = ()=>{
  return auth.currentUser;
}