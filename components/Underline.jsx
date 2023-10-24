export default function Underline({editor}){
    return(
        <button onClick={()=>{console.log(editor.chain().focus().toggleUnderline().run())}} className=" h-8 p-2 object-contain bg-white rounded">
            <img src="/underline.png" className="w-4 h-4" alt="" />
        </button>
    )
}