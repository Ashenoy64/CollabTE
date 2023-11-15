"use client";
import React, { useEffect, useState } from "react";

export function Modal({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-gray-800 text-white p-6 last:rounded-lg  z-10 relative">
        <div className="flex flex-col text-center">{children}</div>
      </div>
    </div>
  );
}

export const Room = ({ state, CloseHandler, RoomHandler }) => {
  const [roomName, setRoomName] = useState("");
  return (
    <Modal>
      <div className="flex flex-col w-full gap-2 justify-center text-black">
        {state == 1 ? (
          <div className="w-full flex flex-col gap-3 justify-center">
            <input
              type="text"
              className="p-2 "
              placeholder="Room Name"
              defaultValue={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <div className="w-full flex flex-row justify-evenly">
              <button
                className="p-2 bg-red-400 rounded w-16"
                onClick={() => CloseHandler(0)}
              >
                Close
              </button>
              <button
                className="p-2 bg-green-400 rounded w-16"
                onClick={() => RoomHandler(roomName)}
              >
                Join
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3 justify-center">
            <input
              type="text"
              className="p-2 "
              placeholder="Room Name"
              defaultValue={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <div className="w-full flex flex-row justify-evenly">
              <button
                className="p-2 bg-red-400 rounded w-16"
                onClick={() => CloseHandler(0)}
              >
                Close
              </button>
              <button
                className="p-2 bg-green-400 rounded w-16"
                onClick={() => RoomHandler(roomName)}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export const CreateFile = ({ CloseHandler, FileHandler }) => {
  const [filename, setFilename] = useState("");
  return (
    <Modal>
      <div className="flex flex-col w-full gap-2 justify-center text-black font-normal text-center">
        <div className="w-full flex flex-col gap-3 justify-center">
          <input
            type="text"
            className="p-2 "
            placeholder="Filename"
            defaultValue={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <div className="w-full flex flex-row justify-evenly">
            <button
              className="p-2 bg-red-400 rounded w-16"
              onClick={() => CloseHandler()}
            >
              Close
            </button>
            <button
              className="p-2 bg-green-400 rounded w-16"
              onClick={() => {
                FileHandler(filename);
                CloseHandler();
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

import { GetUserFiles } from "@/app/lib/firebase";

export const LoadFileViewer = ({ uid, CloseHandler, LoadHandler }) => {
  const [file, setFiles] = useState([]);

  useEffect(() => {
    const GetFiles = async (uid) => {
      if (uid) {
        const data = await GetUserFiles(uid);
        if (data.exists()) {
          const _files = await data.data();
          setFiles(_files["files"]);
        }
      }
    };
    GetFiles(uid);
  }, []);

  return (
    <Modal>
      <div className="flex flex-col w-full gap-3 justify-center text-black font-normal text-center">
        {file.map((val, index) => (
          <button
            className="p-2 rounded text-center bg-black text-white w-56"
            onClick={() => LoadHandler(val)}
            key={index}
          >
            <span>{val}</span>
          </button>
        ))}
        <div>
          <button
            className="p-2 rounded bg-green-300"
            onClick={() => CloseHandler()}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
