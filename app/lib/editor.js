
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from "@tiptap/extension-bold"
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'

const Editor={
    extensions:[
        Document,Paragraph,Text,Bold,ListItem,BulletList
    ],
    
    editorProps:{
        attributes:{
            class:"p-10 text-black h-screen"
        }
    }
}

export default Editor