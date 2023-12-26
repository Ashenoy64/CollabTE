"use client";
import React from "react";
import WordCounter from "./WordCounter";

function Satuts({ username, active }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div
        className={` rounded-full w-2 text-transparent h-2 ${
          active ? "bg-green-400 " : "bg-red-600"
        }`}
      >
        i
      </div>
      <div>{username}</div>
    </div>
  );
}

export default function Footer({ editor,username,status }) {
  return (
    <div className="flex flex-row justify-between px-2">
      <WordCounter editor={editor} />
      <Satuts username={username} active={status} />
    </div>
  );
}
