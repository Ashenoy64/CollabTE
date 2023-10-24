export default function Bullets({editor}){
    return(
        <button className="p-2  h-8 object-contain bg-white rounded" onClick={()=>{editor.chain().focus().toggleBulletList().run()}}>
            <img src="/unordered.png" className="w-4" alt="" />
        </button>
    )
}