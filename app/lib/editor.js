
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
        CharacterCount
    ],
    editorProps:{
        attributes:{class:"h-screen p-10"}
    }
}

export default Editor