"use client";

import React from "react";
import { SaveFileData, LoadFileData, SaveFile } from "@/app/lib/firebase";

//Dummy component to test editor functions
export default function SL({ editor, user }) {
  const handleSave = async () => {
    SaveFileData(editor.getJSON(), "avanish", "test")
      .then(() => {
        alert("Done");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoad = async () => {
    LoadFileData(user.uid, "test")
      .then((docSnap) => {
        if (docSnap.exists()) {
          editor.commands.setContent(docSnap.data());
        } else {
          console.log("Doesnt exist");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-row gap-2">
      <button
        onClick={() => handleSave()}
        className="p-2 h-8  object-contain bg-white rounded text-black"
      >
        Save
      </button>
      <button
        onClick={() => {
          handleLoad();
        }}
        className="p-2 h-8  object-contain bg-white rounded text-black"
      >
        Load
      </button>
    </div>
  );
}
