'use client'
import React,{useState} from "react";
import WordCounter from "./WordCounter";


function Satuts()
{

    const [active,setActive] = useState(false)
    return(
        <div className="flex flex-row gap-2 items-center">
            <div className={` rounded-full w-2 text-transparent h-2 ${active ? "bg-green-600 " : "bg-red-600"}`} >
                i
            </div>
            <div>
                    Avanish
            </div>
        </div>
    )
}

export default function Footer({editor})
{
    return(
        <div className="flex flex-row justify-between px-2">
            <WordCounter editor={editor}/>
            <Satuts/>
        </div>
    )
}