"use client"
import Tiptap from "@/components/Tiptap"
import Bold from "@/components/Bold"
import ListItems from "@/components/ListItems";
import Editor from "../lib/editor";
import { useEditor } from "@tiptap/react";
import { useContext,createContext } from "react";

export default function Home(){
    const editor=useEditor(Editor)

    return(
        <div className="bg-white text-black" >
            <Bold editor={editor}/>
            <ListItems editor={editor}/>
            <Tiptap editor={editor}/>
        </div>
    )
}