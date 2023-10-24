export default function Numbers({editor}){
    return(
        <button className="p-2  h-8 object-contain bg-white rounded" onClick={()=>{editor.chain().focus().toggleOrderedList().run()}}>
            <img src="/ordered.png" className="w-4" alt="" />
        </button>
    )
}