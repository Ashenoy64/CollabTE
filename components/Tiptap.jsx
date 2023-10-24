"use client"
import { EditorContent } from "@tiptap/react"



const Tiptap=({editor})=>{
    return(
            <div>
                <EditorContent editor={editor}/>
            </div>
    )

}

export default Tiptap