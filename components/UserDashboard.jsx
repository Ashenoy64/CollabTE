"use client";

import React, { useState,useEffect } from "react";
import { useRouter,redirect } from "next/navigation";
import { LogOut,GetCurrentUser } from "@/app/lib/firebase";


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
    const [user,setUser] = useState(null)
    const router = useRouter()
    useEffect(()=>{
      const currentUser = GetCurrentUser()

        // if(currentUser==null)
        //     redirect('/')   
        // else
        //     setUser(currentUser)
        console.log(currentUser)

    },[user])

    

  const handleSignOut = async () => {
        LogOut().then(()=>{
            router.push('/')
        }).catch((error)=>{
            console.log(error)
        })
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

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex flex-row justify-between  top-0 border-b-2 text-white w-full p-2">
        <div className="font-bold text-xl pb-2">CollabTE</div>
        <div className="flex flex-row gap-2 text-black">
          <button className=" hover:shadow-[0_0_5px_1px_rgba(255,_255,_255,_0.5)] rounded p-2 bg-blue-500" >
            Join Room
          </button>
          <button className=" hover:shadow-[0_0_5px_1px_rgba(255,_255,_255,_0.5)] rounded p-2 bg-blue-300" onClick={()=>console.log(GetCurrentUser())}>Create Room</button>
          <button className=" hover:shadow-[0_0_5px_1px_rgba(255,_255,_255,_0.5)] rounded p-2 bg-blue-200" onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <div className="flex flex-row w-full items-center h-full p-4">
          <div className="text-2xl font-bold ">
              Welcome Avanish
          </div>
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
