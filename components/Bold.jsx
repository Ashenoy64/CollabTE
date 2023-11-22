
/*
Setting up the bold feature for the editor
*/
export default function BoldText({editor}){
    
    return(
        <button onClick={()=>{editor.chain().focus().toggleBold().run()}} className={`p-2 h-8 object-contain ${editor.isActive('bold')?"bg-slate-300":"bg-white"}  rounded `} >
            <img src="/bold.png" alt="Bold"  className="w-4"/>
        </button>
    )
}