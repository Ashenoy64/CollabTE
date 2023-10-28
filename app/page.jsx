"use client";
import React, { useState } from "react";
import {GoogleSignIn,CreateNewUser,SignInWithEmail} from "./lib/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);

  const router = useRouter();

  const handleToggle = () => {
    setLogin(!login);
    setEmail("");
    setPassword("");
    setConfirmPassowrd("");
    
  };

  const Notify=(notice)=>{

        setNotice(notice)
        setNoticeActive(true)

        setTimeout(()=>{
          setNoticeActive(false)
        },3000)
  }

  const checkPassword = () => {
    if (password.length < 6)
    {
      Notify('Password Length must be greater than 6')
      return false
    }
    if(password!=confirmPassword)
    {
      Notify('Passwords does\'nt match')
      return false
    }
    return true;
  };

  const handleGoogleSignIn = async () => {
    GoogleSignIn()
      .then((user) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        Notify("There was some problem while signing you in")
      });
  };

  const handleNewUserRegistration = async () => {
    if (checkPassword()) {
      CreateNewUser(email,password)
      .then((user) => {
        
        router.push("/dashboard");
      })
      .catch((error) => {
        Notify("There was some problem while signing you in")
      });
    }
  };

  const handleSigInWithEmail = async () => {   
    if (email == "" || password == "") return;
    SignInWithEmail(email,password)
    .then((user) => {
      router.push("/dashboard");
    })
    .catch((error) => {
      Notify("There was some problem while signing you in")
    });
  };

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      
      <div className={`absolute top-0 p-2 bg-neutral-900 border-2 text-white  left-0 rounded   ${noticeActive?'block':'hidden'} `}>{notice}</div>
      <div className=" flex flex-col text-center justify-around border-2 p-2 rounded shadow-[0_0_100px_1px_rgba(255,_255,_255,_0.3)] w-96 h-3/4">
        <div className="flex flex-row gap-2 text-center mx-auto  rounded-md border-2">
          <span
            className={`font-bold text-lg p-1 w-24 rounded-md ${
              login ? "bg-white text-black" : ""
            } cursor-pointer  `}
            onClick={handleToggle}
          >
            Login
          </span>
          <span
            className={`font-bold text-lg p-1 w-24 rounded-md ${
              !login ? "bg-white text-black" : ""
            } cursor-pointer `}
            onClick={handleToggle}
          >
            Register
          </span>
        </div>

        {login ? (
          <form className="flex flex-col gap-4 w-3/4 mx-auto"  onSubmit={(e)=>{e.preventDefault();handleSigInWithEmail()}}>
            <input
              type="email"
              className="rounded  p-1 text-black"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <input
              type="password"
              className="rounded  p-1 text-black"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              autoComplete="off"
            />
            <button
              className="p-2 hover:bg-green-300 w-1/2 rounded mx-auto border-2"
              type="submit"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4 w-3/4 mx-auto" onSubmit={(e)=>{e.preventDefault();handleNewUserRegistration()}}>
            <input
              type="email"
              className="rounded  p-1 text-black"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <input
              type="password"
              name="password"
              className="rounded  p-1 text-black"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              autoComplete="off"
            />
            <input
              type="password"
              name="current_password"
              className="rounded  p-1 text-black"
              placeholder="Confirm Password"
              required
              onChange={(e) => {
                setConfirmPassowrd(e.currentTarget.value);
              }}
              autoComplete="off"
            />
            <button
              className="p-2 hover:bg-green-300 w-1/2 rounded mx-auto border-2"
              type="submit"
            >
              Register
            </button>
          </form>
        )}

        <button
          className="p-2 justify-center object-contain flex items-center gap-4 hover:bg-green-300 border-2 w-1/2 rounded mx-auto "
          onClick={handleGoogleSignIn}
        >
          <img src="/google.png" alt="" className="w-8 " />
          Google Sign-in
        </button>
      </div>
    </main>
  );
}
