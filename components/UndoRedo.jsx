'use client'

import React from "react"


export default function UndoRedo({editor})
{
    return(
        <div className="flex flex-row gap-1">
            <button className="p-2 h-8  object-contain bg-white rounded" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>  
                <img src="/undo.png" className="w-4" alt="" />
            </button>
            <button className="p-2 h-8 object-contain bg-white rounded" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                <img src="/redo.png" className="w-4" alt="" />
            </button>
        </div>
    )
}