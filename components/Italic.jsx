

/*
Setting up the italics feature for the editor
*/
export default function ItalicText({editor}){
    return(
        <button onClick={()=>{editor.chain().focus().toggleItalic().run()}} className={`p-2 h-8 object-contain ${editor.isActive('italic')?"bg-slate-300":"bg-white"}  rounded `}>
            <img src="/italics.png" className="w-4" alt="Italic" />
        </button>
    )
}