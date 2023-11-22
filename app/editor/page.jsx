"use client";

import { useEditor } from "@tiptap/react";
import React, { useEffect, useState } from "react";
import Tiptap from "@/components/Tiptap";
import { EditorConfig } from "../lib/editor";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";
import PopMenu from "@/components/PopMenu";
import { auth, CheckSession, LoadFileData } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import Autocomplete from "@/components/Autocomplete";

export default function Page(){
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [session, setSession] = useState(null);
  const [root, setRoot] = useState(null);
  const [room, setRoomName] = useState("");
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);

  // Function to notify user through popup
  const Notify = (notice) => {
    setNotice(notice);
    setNoticeActive(true);

    setTimeout(() => {
      setNoticeActive(false);
    }, 3000);
  };

  //Runs in parallel in the first render to get the authenticated user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, []);

  //Get all seach params
  const searchParms = useSearchParams();
  const roomName = searchParms.get("roomName");
  const isOnline = searchParms.get("isOnline");
  const userName = searchParms.get("user");
  const decodeRoomName = roomName ? atob(roomName) : "untitled";
  const name = userName ? atob(userName) : "USER";
  const editor =useEditor(isOnline == "true" ? EditorConfig(isOnline, decodeRoomName, name):EditorConfig(false, "", ""));

  //If the session is realtime gets information related to the session in parallel
  useEffect(() => {
    const LoadSession = async (roomID) => {
      if (!session) {
        try {
          const sessionData = await CheckSession(roomID);
          if (sessionData.exists()) {
            const data = await sessionData.data();
            setSession(data);
            if (root == null) {
              setRoot(data.owner == user.uid);
              setRoomName(data.roomName);
            }
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.log(error);
          Notify("Problem While Loading the session");
        }
      }
    };
    if (isOnline == "true" && user) LoadSession(decodeRoomName);
  }, [isOnline, user]);

  //Editor content handler to set data, mainly used to set the data by nested components
  const DataSetter = (data) => {
    setData(data);
    editor.commands.setContent(data);
  };

  //If the session is offline, this gets the file data
  useEffect(() => {
    const LoadFile = async (filename, editor) => {
      if (!data)
        LoadFileData(user.uid, filename)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setData(docSnap.data());
              editor.commands.setContent(docSnap.data());
              if (root == null) {
                setRoot(false);
                setRoomName(decodeRoomName);
              }
            }
          })
          .catch((error) => {
            console.log(error);
            Notify("There was a problem while loading the file");
          });
    };

    if (isOnline == "false" && editor && user) LoadFile(decodeRoomName, editor);

    setRoomName(decodeRoomName);
  }, [isOnline, editor, user]);

  //Conditionally render the component based on authenticity of the user
  if (user) {
    return (
      <div className=" flex flex-col justify-center">
        <div
          className={`absolute top-0 p-2 bg-neutral-900 border-2 text-white  left-0 rounded z-10  ${
            noticeActive ? "block" : "hidden"
          } `}
        >
          {notice}
        </div>
        <PopMenu editor={editor} />
        <div className="w-full p-2 flex flex-col justify-center">
          <TopBar
            filename={room}
            root={root}
            uid={user.uid}
            editor={editor}
            SetData={DataSetter}
            isOnline={isOnline}
            sessionID={decodeRoomName}
            NotifyHandler={Notify}
          />
          <MenuBar editor={editor} user={user}></MenuBar>
        </div>
        <Tiptap editor={editor}/>
        <div>
          <Footer editor={editor} username={name} status={isOnline == "true"} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
};
