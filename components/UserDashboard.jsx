"use client";

import React, { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import { LogOut, GetCurrentUser, auth } from "@/app/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

function FIleItems({ name, size }) {
  const [options, setOptions] = useState(false);

  const handleOptions = () => {
    console.log("Press");
    setOptions(!options);
  };
  return (
    <div className="flex flex-row justify-between  rounded border-2  p-2 w-full mx-auto">
      <div>{name}</div>
      <div>{size}</div>
      <div>
        <button className="text-xl font-bold " onClick={() => handleOptions()}>
          ...
        </button>
        <div
          className={`absolute  bg-white text-black border-2 border-black flex flex-col gap-2 rounded  p-2 ${
            options ? "block" : "hidden"
          }`}
        >
          <button className="p-1 ">Delete</button>
          <button className="p-1 ">View</button>
        </div>
      </div>
    </div>
  );
}

export default function UserDashBoard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, []);

  const handleSignOut = async () => {
    LogOut()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const files = [
    { name: "Test.txt", size: "20MB" },
    { name: "Test1.txt", size: "21MB" },
    { name: "Test2.txt", size: "22MB" },
    { name: "Test3.txt", size: "23MB" },
    { name: "Test4.txt", size: "24MB" },
    { name: "Test5.txt", size: "25MB" },
    { name: "Test5.txt", size: "25MB" },
    { name: "Test5.txt", size: "25MB" },
    { name: "Test5.txt", size: "25MB" },
    { name: "Test5.txt", size: "25MB" },
    { name: "Test6.txt", size: "26MB" },
  ];

  if (user) {
    return (
      <div className="flex flex-col w-full h-full ">
        <div className="flex flex-row justify-between  top-0 border-b-2 text-white w-full p-2">
          <div className="font-bold text-xl pb-2">CollabTE</div>
          <div className="flex flex-row gap-2 text-black">
            <button className=" hover:shadow-[0_0_5px_1px_rgba(255,_255,_255,_0.5)] rounded p-2 bg-blue-500">
              Join Room
            </button>
            <button
              className=" hover:shadow-[0_0_5px_1px_rgba(255,_255,_255,_0.5)] rounded p-2 bg-blue-300"
              onClick={() => console.log(GetCurrentUser())}
            >
              Create Room
            </button>
            <button
              className=" hover:shadow-[0_0_5px_1px_rgba(255,_255,_255,_0.5)] rounded p-2 bg-blue-200"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex flex-row w-full items-center h-full p-4">
          <div className="text-2xl font-bold ">Welcome Avanish</div>
        </div>
        <div className="flex flex-col w-full justify-center text-white items-center h-full">
          <div className="w-full text-lg font-semibold p-4">
            Here Are Your files
          </div>
          <div className="flex flex-col overflow-auto no-scrollbar w-96 h-1/2 gap-2 shadow-[0_0_100px_1px_rgba(255,_255,_255,_0.3)]">
            {files.map((val, ind) => (
              <FIleItems key={ind} {...val} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
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
    </div>
  );
}
