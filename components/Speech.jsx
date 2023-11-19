

export default function Speech({editor}){
    return(
        <div>
        <button onClick={()=>{editor.commands.startSpeechRecognition()}} className={`p-2 h-8 object-contain ${editor.isActive('Speech')?"bg-slate-300":"bg-white"}  rounded`}>
            Start
        </button>
        
        <button onClick={()=>{editor.commands.stopSpeechRecognition()}} className={`p-2 h-8 object-contain ${editor.isActive('Speech')?"bg-slate-300":"bg-white"}  rounded`}>
        Stop
    </button>
    </div>

    )
}