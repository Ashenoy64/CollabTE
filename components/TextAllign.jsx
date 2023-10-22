import { isActive } from "@tiptap/react"
export default function Allign({editor}){
    return(
        <div>

            <button onClick={() =>{editor.chain().focus().setTextAlign('left').run()}} className="p-2">
                Left
            </button>


            <button onClick={() =>{editor.chain().focus().setTextAlign('center').run()}} className="p-2">
                Center
            </button>

            <button onClick={() =>{editor.chain().focus().setTextAlign('right').run()}} className="p-2">
                Right
            </button>
      
    
    </div>
    )
}