//Tiptap extention which displays number of character written on to the editor
export default function WordCounter({ editor }) {
  return (
    <div className="p-5">
      <h2>Words {editor.storage.characterCount.characters()}</h2>
    </div>
  );
}
