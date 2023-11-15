/*
Setting up the underline feature for the editor
*/
export default function Underline({editor}){
    return(
        <button onClick={()=>{console.log(editor.chain().focus().toggleUnderline().run())}} className={`p-2 h-8 object-contain ${editor.isActive('underline')?"bg-slate-300":"bg-white"}  rounded `}>
            <img src="/underline.png" className="w-4 h-4" alt="Underline" />
        </button>
    )
}