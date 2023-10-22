export default function Underline({editor}){
    return(
        <button onClick={()=>{console.log(editor.chain().focus().toggleUnderline().run())}}>
            Underline
        </button>
    )
}