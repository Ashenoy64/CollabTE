import { BubbleMenu } from "@tiptap/react";
import { useState } from "react";
import Autocomplete from "C:/Users/User/Desktop/New folder/CollaborativeEditor-1/components/Autocomplete.js";
import getSelectedText from "@/app/lib/getSelectedText";

//Popup menue to get the suggestion over the selected text
export default function PopMenu({ editor }) {
  const [result, setResult] = useState("");
  return (
    <BubbleMenu editor={editor}>
      <div className="">
        <button
          onClick={() => {
            setResult(getSelectedText(editor));
          }}
        >
          Get Suggestions
        </button>
        <p
          className="p-2 text-green"
          onClick={() => {
            setResult("");
          }}
        >
          <Autocomplete suggestions={["time", "person", "year", "way", "day", "thing", "man", "world", "life", "hand","part", "child", "eye", "woman", "place", "work", "week", "case", "point", "government", "company", "number", "group", "problem", "fact", "be", "have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think", "look", "want", "give", "use", "find", "tell", "ask", "seem", "feel", "try", "leave", "call", "good", "new","school", "system", "thing", "hand", "service", "game", "party", "result", "example", "community","quality", "development", "language", "management", "player", "study", "family", "country", "problem", "company","product", "information", "group", "person", "university", "experience", "society", "business", "government", "team","number", "child", "way", "place", "member", "idea", "market", "body", "program", "area","book", "order", "change", "house", "support", "work", "point", "form", "use", "problem",]}/>
        </p>
      </div>
    </BubbleMenu>
  );
}
