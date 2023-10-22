import React from "react"
export default function Fonts({editor}){
    const fonts=["inter",'serif',"monospace","cursive"]

    const items = fonts.map((x) => (
        <button
          key={x} // Add a unique key for each button
          onClick={() => {
            editor.chain().focus().setFontFamily(x).run();
          }}
          className="p-2"
        >
          {x}
        </button>
      ));
      
    return(
        <div className="text-white">
            {

                items

            }
            
        </div>
    )
}