export default function WordCounter({editor}){
    return(

        <div className="p-5">
            <h2>Characters {editor.storage.characterCount.characters()}</h2>
            
        </div>
    )
}