// import { isActive } from "@tiptap/react";

/*
Setting up the alignment feature for the editor
*/
export default function Allign({ editor }) {
  return (
    <div className="flex flex-row gap-1">
      <button
        onClick={() => {
          editor.chain().focus().setTextAlign("left").run();
        }}
        className={`p-2 h-8 object-contain ${
          editor.isActive({ textAlign: "left" }) ? "bg-slate-300" : "bg-white"
        }  rounded `}
      >
        <img src="/left-align.png" className="w-4" alt="Left" />
      </button>

      <button
        onClick={() => {
          editor.chain().focus().setTextAlign("center").run();
        }}
        className={`p-2 h-8 object-contain ${
          editor.isActive({ textAlign: "center" }) ? "bg-slate-300" : "bg-white"
        }  rounded `}
      >
        <img className="w-4" src="/center-align.png" alt="Center" />
      </button>

      <button
        onClick={() => {
          editor.chain().focus().setTextAlign("right").run();
        }}
        className={`p-2 h-8 object-contain ${
          editor.isActive({ textAlign: "right" }) ? "bg-slate-300" : "bg-white"
        }  rounded `}
      >
        <img className="w-4" src="/right-align.png" alt="Right" />
      </button>
    </div>
  );
}
