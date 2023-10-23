
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Heading from '@tiptap/extension-heading'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from "yjs"
import {WebrtcProvider} from "y-webrtc"
import { HocuspocusProvider } from '@hocuspocus/provider'
const ydoc=new Y.Doc()
// const provider= new WebrtcProvider("tiptap-collaboration-cursor-extension",ydoc)
const provider=new HocuspocusProvider({
    url:"ws://127.0.0.1:1234",
    name: "example-document"
})

const Editor={
    extensions:[
        Document,
        Paragraph,
        Text,
        Bold,
        Heading.configure({levels: [1, 2, 3],}),
        Italic,
        Underline,
        TextAlign.configure({types: ['heading', 'paragraph',],}),
        TextStyle,
        FontFamily,
        ListItem,
        OrderedList,
        CharacterCount,
        Collaboration.configure({
            document: provider.document
        })
    ],
    editorProps:{
        attributes:{class:"h-screen m-5 p-5 bg-zinc-500"}
    },
    onUpdate: ({ editor }) => {
        const json = editor.getJSON()
        
        // send the content to an API here
      },
}

export default Editor