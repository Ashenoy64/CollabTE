// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut} from 'firebase/auth'

const firebaseConfig = {
  
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