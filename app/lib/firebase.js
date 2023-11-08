// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut,onAuthStateChanged } from 'firebase/auth'
import { get, getDatabase,ref,set } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyBFJfF-65jY3tVu0SLxx7IVqGFKK2vqyfI",
  databaseURL: "https://collabte-87933-default-rtdb.asia-southeast1.firebasedatabase.app",
  authDomain: "collabte-87933.firebaseapp.com",
  projectId: "collabte-87933",
  storageBucket: "collabte-87933.appspot.com",
  messagingSenderId: "17972686438",
  appId: "1:17972686438:web:dc6d47585db806b23687a7",
  measurementId: "G-LQTY6FXM75"
};


/*
Initializing the services of firebase
*/
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

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

/*
  Function provides google authentication service
*/
export const GoogleSignIn = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

/*
  Function to log out the user from the session
*/
export const LogOut = () => {
  return signOut(auth)
}

/*
  Function to register the user using email and password
*/
export const CreateNewUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

/*
  Function to set up a session for the user using email and password
*/
export const SignInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

/*
  Function to get the current user under session
*/
export const GetCurrentUser = (callBack) => {
  return onAuthStateChanged(auth,callBack(user));
}


/*
  Function to save the file
*/
export const SaveFile = (object, username, filename) => {
  return setDoc(doc(db, "files", username + '-' + filename), object)
}


/*
  Function to load the file
*/
export const LoadFile = (username, filename) => {
  return getDoc(doc(db, 'files', username + '-' + filename))
}
