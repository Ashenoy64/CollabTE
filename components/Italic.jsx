


export default function ItalicText({editor}){
    return(
        <button onClick={()=>{editor.chain().focus().toggleItalic().run()}} className="p-2 h-8 object-contain bg-white rounded">
            <img src="/italics.png" className="w-4" alt="" />
        </button>
    )
}