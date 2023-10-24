export default function HeadingText({ editor }) {
  return (
    <div className="flex flex-row gap-1">
      <button
        className="p-2 h-8 bg-white object-contain rounded text-black"
        onClick={() => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        }}
      >
        <img src="/h1.png" alt="h1" className="w-4" />
      </button>
      <button
        className="p-2 h-8 bg-white object-contain rounded text-black"
        onClick={() => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        }}
      >
        <img src="/h2.png" alt="h1" className="w-4" />
      </button>
      <button
        className="p-2 h-8 bg-white object-contain rounded text-black"
        onClick={() => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        }}
      >
        <img src="/h3.png" alt="h1" className="w-4" />
      </button>
    </div>
  );
}
