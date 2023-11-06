'use client'


import React,{useState} from "react"


/*
Setting up different font styles for the editor
*/
export default function Fonts({editor}){
    const [open,setOpen] = useState(false)
    const [option,setOption] = useState("inter")

    const fonts=["inter",'serif',"monospace","cursive","roboto"]

    const items = fonts.map((x) => (
        <button
          key={x} 
          onClick={() => {
            setOption(x)
            editor.chain().focus().setFontFamily(x).run();
          }}
          className="p-2 capitalize text-black font-bold"
        >
          {x}
        </button>
      ));
      
    return(
        <div className="h-8 ">
            <button onClick={()=>{setOpen(!open)}} className="font-bold capitalize bg-white text-black p-2 rounded w-28 h-10 mx-auto ">
              {option}
            </button>
            <div className={`absolute flex flex-col bg-slate-400 z-10 rounded ${open?"block":"hidden"}`}>
              {items}
            </div>
        </div>
    )
}