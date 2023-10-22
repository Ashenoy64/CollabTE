
function getSelectedText(editor){
    var items=editor.view.state.selection.content().toJSON()["content"].filter((x)=>x["content"])
    items=items.map((x)=>{return x["content"][0]["text"]})
    
    return items
    
}

export default getSelectedText