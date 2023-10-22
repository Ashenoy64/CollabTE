

export default function HeadingText({editor}){

    
    return(
        <button
        onClick={() => {editor.chain().focus().setHeading({ level: 1 }).run()}}
        
      >
        H1
      </button>
    )
}