import { BubbleMenu } from "@tiptap/react"
import { useState } from "react"

import getSelectedText from "@/app/lib/getSelectedText"

export default function PopMenu({editor}){

    const[result,setResult]=useState("")
    return(
        <BubbleMenu editor={editor} >
            <div className="">

                <button onClick={()=>{setResult(getSelectedText(editor))}}>
                    Get Suggestions
                </button>
                <p className="p-2 text-green" onClick={()=>{setResult("")}}>{result}</p>
            </div>

        </BubbleMenu>
    )
}