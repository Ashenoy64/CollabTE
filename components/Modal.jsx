"use client";
import React, { useState } from "react";



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

export const Room = ({ state, CloseHandler,RoomHandler}) => {

    const [roomName,setRoomName] = useState("")
  return (
    <Modal>
      <div className="flex flex-col w-full gap-2 justify-center text-black">
        {
            state == 1 ?
            <div className="w-full flex flex-col gap-3 justify-center">
                <input type="text" className="p-2 " placeholder="Room Name" defaultValue={roomName} onChange={(e)=>setRoomName(e.target.value)}/>
                <div className="w-full flex flex-row justify-evenly">
                    <button className="p-2 bg-red-400 rounded w-16" onClick={()=>CloseHandler(0)}>Close</button>
                    <button className="p-2 bg-green-400 rounded w-16" onClick={()=>RoomHandler(roomName)}>Join</button>
                </div>
            </div>:
            <div className="w-full flex flex-col gap-3 justify-center">
            <input type="text" className="p-2 " placeholder="Room Name" defaultValue={roomName} onChange={(e)=>setRoomName(e.target.value)}/>
            <div className="w-full flex flex-row justify-evenly">
                <button className="p-2 bg-red-400 rounded w-16" onClick={()=>CloseHandler(0)}>Close</button>
                <button className="p-2 bg-green-400 rounded w-16" onClick={()=>RoomHandler(roomName)}>Create</button>
            </div>
        </div>
            
        }
      </div>
    </Modal>
  );
};
