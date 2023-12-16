import { useState } from "react";
export default function Speech({ editor }) {

    const [state,setState] =  useState(false);

    const ToggleSpeech = ()=>{
        setState(!state)
        if(state)
        {
            editor.commands.stopSpeechRecognition();
        }
        else{
            editor.commands.startSpeechRecognition();
        }
    }

  return (
    <div>
      <button
        onClick={() => {
          ToggleSpeech()
        }}
        className={`p-2 w-8 h-8 object-contain ${
            state ? "bg-slate-300" : "bg-white"
        }  rounded`}
      >
        <img src="/mic.png" alt="" className="w-8 " />
      </button>
    </div>
  );
}
