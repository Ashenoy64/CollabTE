// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, setDoc, doc, deleteDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { get, getDatabase, ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "",
  databaseURL: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId:"",
  appId: "",
  measurementId: "",
};



/*
Initializing the services of firebase
*/
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const database = getDatabase(app)


//Saves the data during realtime editing 
export const setData = (docName, docData) => {
  set(ref(database, "users/" + docName), {
    data: docData,

  })
    .then(() => {
      console.log("ok")
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
}

//Loads the data when a new user joins the room
export const getData = (docName) => {
  return get(ref(database, "users/" + docName))
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
  return onAuthStateChanged(auth, callBack(user));
}


/*
  Function to save the filename under a user
*/
export const SaveFile = (uid, filename) => {
  return updateDoc(doc(db, 'users', uid), {
    files: arrayUnion(filename)
  })
}
//Function to delete a file under a user
export const DeleteFile = (uid, filename) => {
  return updateDoc(doc(db, 'users', uid), {
    files: arrayRemove(filename)
  })
}


//Function to delete file data
export const DeleteFileData = (uid, filename) => {
  return deleteDoc(doc(db, "files", uid + '-' + filename))
}


//Function to save the file data
export const SaveFileData = (object, username, filename) => {
  return setDoc(doc(db, "files", username + '-' + filename), object)
}

//function to get all files under a user
export const GetUserFiles = (uid) => {
  return getDoc(doc(db, "users", uid))
}


/*
  Function to load the file
*/
export const LoadFileData = (username, filename) => {
  return getDoc(doc(db, 'files', username + '-' + filename))
}

//Function to register a user separately to maintain the  filesystem
export const CreateNewUserEntry = async (user) => {

  try {
    const docSnapshot = await getDoc(doc(db, 'users', user.uid));
    if (!docSnapshot.exists()) {
      const baseData = {
        files: [],
      };

      await setDoc(doc(db, 'users', user.uid), baseData);
    }
  } catch (error) {
    console.error("Error creating user entry:", error);
    throw error; // Propagate the error for handling in the caller
  }
};

//Function to create a real time session
export const CreateSession=async (user,roomName)=>{

    return setDoc(doc(db,'session',roomName+'-'+user.uid),
    {
      owner:user.uid,
      roomName:roomName,
      roomID:roomName+'-'+user.uid,
    })
}

//Function to check if a session exists or not, if it exists returns the context
export const CheckSession = async(roomID)=>{
  try{
    const docSnapshot = await getDoc(doc(db, 'session', roomID));
    return docSnapshot
  }
  catch(error)
  {
    throw error;
  }
}


