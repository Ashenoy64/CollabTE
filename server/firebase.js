// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut} from 'firebase/auth'
import { get, getDatabase,ref,set } from "firebase/database";
import dotenv from 'dotenv'

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  databaseURL: process.env.DBURL,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MESSAGE_ID,
  appId: process.env.APPID,
  measurementId: process.env.MID,
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const database=getDatabase(app)

export const setData=(docName,docData)=>{
  const user=GetCurrentUser()
  set(ref(database,"users/"+docName),{
    data:docData,
    
  })
  .then(()=>{
    console.log("ok")
  })
  .catch((error)=>{
    console.log("Error: ",error)
  })
}

export const getData=(docName)=>{
  
  return get(ref(database,"users/"+docName))

}

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