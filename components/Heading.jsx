
/*
Setting up different heading for the editor
*/
export default function HeadingText({ editor }) {
  return (
    <div className="flex flex-row gap-1">
      <button
      className={`p-2 h-8 object-contain ${editor.isActive('heading',{level:1})?"bg-slate-300":"bg-white"}  rounded text-black`}
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        <img src="/h1.png" alt="h1" className="w-4" />
      </button>
      <button
      className={`p-2 h-8 object-contain ${editor.isActive('heading',{level:2})?"bg-slate-300":"bg-white"}  rounded text-black`}
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <img src="/h2.png" alt="h1" className="w-4" />
      </button>
      <button
      className={`p-2 h-8 object-contain ${editor.isActive('heading',{level:3})?"bg-slate-300":"bg-white"}  rounded text-black`}
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        <img src="/h3.png" alt="h1" className="w-4" />
      </button>
    </div>
  );
}
