


export default function BoldText({editor}){
    
    return(
        <button onClick={()=>{editor.chain().focus().toggleBold().run()}} className="p-2 h-8 object-contain bg-white rounded" >
            <img src="/bold.png" alt=""  className="w-4"/>
        </button>
    )
}