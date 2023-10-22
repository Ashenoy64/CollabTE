export default function Numbers({editor}){
    return(
        <button className="p-2" onClick={()=>{editor.chain().focus().toggleOrderedList().run()}}>
            Ordered List
        </button>
    )
}