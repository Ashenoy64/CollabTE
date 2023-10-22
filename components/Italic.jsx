


export default function ItalicText({editor}){
    return(
        <button onClick={()=>{editor.chain().focus().toggleItalic().run()}} className="p-2">
            Italic
        </button>
    )
}