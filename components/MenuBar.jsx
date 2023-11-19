import React from "react";
import TextAllign from "@/components/TextAllign";
import BoldText from "@/components/Bold";
import ItalicText from "@/components/Italic";
import Underline from "@/components/Underline";
import HeadingText from "@/components/Heading";
import Fonts from "@/components/Fonts";
import Numbers from "@/components/Numbers";
import UndoRedo from "./UndoRedo";
import Bullets from "./BulletList";
import Speech from "./Speech"


//Menue bar  encomposes all the editor features together
export default function MenuBar({ editor, user }) {
  return (
    <div className="w-full md:w-3/4  bg-neutral-800 flex flex-row p-4 justify-evenly mx-auto rounded">
      <div className="flex flex-col gap-1 justify-center">
        <div className="flex flex-row  justify-evenly">
          <BoldText editor={editor} />
          <ItalicText editor={editor} />
          <Underline editor={editor} />
          <Speech editor={editor}/>
        </div>
        <Fonts editor={editor} />
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <TextAllign editor={editor} />
        <HeadingText editor={editor} />
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <UndoRedo editor={editor} />
        <div className="flex flex-row gap-1">
          <Bullets editor={editor} />
          <Numbers editor={editor} />
        </div>
      </div>
    </div>
  );
}
