


export default function BoldText({editor}){
    
    return(
        <button onClick={()=>{editor.chain().focus().toggleBold().run()}} className="p-2" >
            Bold
        </button>
    )
}