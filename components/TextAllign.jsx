import { isActive } from "@tiptap/react"
export default function Allign({editor}){
    return(
        <div className="flex flex-row gap-1">

            <button onClick={() =>{editor.chain().focus().setTextAlign('left').run()}} className="p-2 h-8 object-contain bg-white rounded">
                <img src="/left-align.png" className="w-4" alt="" />
            </button>


            <button onClick={() =>{editor.chain().focus().setTextAlign('center').run()}} className="p-2 h-8 object-contain bg-white rounded">
                <img className="w-4"  src="/center-align.png" alt="" />
            </button>

            <button onClick={() =>{editor.chain().focus().setTextAlign('right').run()}} className="p-2 h-8 object-contain bg-white rounded">
                <img className="w-4" src="/right-align.png" alt="" />
            </button>
      
    
    </div>
    )
}