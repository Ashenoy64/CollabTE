"use client";
import { EditorContent } from "@tiptap/react";


//Tiptap editor
const Tiptap = ({ editor }) => {
  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
