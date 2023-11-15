/*
Setting up the number list feature for the editor
*/
export default function Numbers({editor}){
    return(
        <button className={`p-2 h-8 object-contain ${editor.isActive('orderedList')?"bg-slate-300":"bg-white"}  rounded `} onClick={()=>{editor.chain().focus().toggleOrderedList().run()}}>
            <img src="/ordered.png" className="w-4" alt="Numbers" />
        </button>
    )
}