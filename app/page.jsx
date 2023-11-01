"use client";
import React, { useState } from "react";
import { GoogleSignIn, CreateNewUser, SignInWithEmail } from "./lib/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleToggle = () => {
    setLogin(!login);
    setEmail("");
    setPassword("");
    setConfirmPassowrd("");
  };

  const Notify = (notice) => {
    setNotice(notice);
    setNoticeActive(true);

    setTimeout(() => {
      setNoticeActive(false);
    }, 3000);
  };

  const checkPassword = () => {
    if (password.length < 6) {
      Notify("Password Length must be greater than 6");
      return false;
    }
    if (password != confirmPassword) {
      Notify("Passwords does'nt match");
      return false;
    }
    return true;
  };

  const handleGoogleSignIn = async () => {
    
    setGoogleLoading(true)
    GoogleSignIn()
      .then((user) => {
        setGoogleLoading(false)
        router.push("/dashboard");
      })
      .catch((error) => {
        Notify("There was some problem while signing you in");
        setGoogleLoading(false)
      });
  };

  const handleNewUserRegistration = async () => {
    setLoading(true)
    if (checkPassword()) {
      CreateNewUser(email, password)
        .then((user) => {
          router.push("/dashboard");
        })
        .catch((error) => {
          Notify("There was some problem while signing you in");
        });
    }
    setLoading(false)
  };

  const handleSigInWithEmail = async () => {
    if (email == "" || password == "") return;
    setLoading(true)
    SignInWithEmail(email, password)
      .then((user) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        Notify("There was some problem while signing you in");
      });
      setLoading(false)
  };

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <div
        className={`absolute top-0 p-2 bg-neutral-900 border-2 text-white  left-0 rounded   ${
          noticeActive ? "block" : "hidden"
        } `}
      >
        {notice}
      </div>
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
          <form
            className="flex flex-col gap-4 w-3/4 mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSigInWithEmail();
            }}
          >
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
              className="p-2 hover:bg-green-300 w-1/2 rounded mx-auto border-2 flex flex-row items-center justify-center"
              type="submit" disabled={loading ? true : false}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        ) : (
          <form
            className="flex flex-col gap-4 w-3/4 mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleNewUserRegistration();
            }}
          >
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
              className="p-2 hover:bg-green-300 w-1/2 rounded mx-auto border-2 flex flex-row items-center justify-center"
              type="submit" disabled={loading ? true : false}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>
        )}

        <button 
          className="p-2 justify-center object-contain flex items-center gap-4 hover:bg-green-300 border-2 w-1/2 rounded mx-auto "
          onClick={handleGoogleSignIn} disabled={googleLoading ? true : false}
        >
          {googleLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <img src="/google.png" alt="" className="w-8 " />
              Google Sign-in
            </>
          )}
        </button>
      </div>
    </main>
  );
}
