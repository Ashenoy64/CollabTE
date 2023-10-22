"use client"


export default function BoldText({editor}){
    
    return(
        <button onClick={()=>{editor.chain().focus().toggleBold().run()}} className="text-black">
            Bold
        </button>
    )
}