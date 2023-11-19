
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
import History from '@tiptap/extension-history'
import BulletList from '@tiptap/extension-bullet-list'
import { WebrtcProvider } from "y-webrtc"
import { HocuspocusProvider } from '@hocuspocus/provider'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import SpeechRecognition from 'extensions/src/SpeechRecognition'

import * as Y from "yjs"


/*
Editor Config returns the configuration based on the required editor state
*/
export const EditorConfig = (isOnline, roomName, userName) => {

    if (isOnline) {
        const provider = new HocuspocusProvider({
            url: "ws://127.0.0.1:1234",
            name: roomName
        })
        const EditorConf = {
            extensions: [
                Document,
                Paragraph,
                Text,
                Bold,
                Heading.configure({ levels: [1, 2, 3], }),
                Italic,
                Underline,
                TextAlign.configure({ types: ['heading', 'paragraph',], }),
                SpeechRecognition.configure({lang: 'en-EN',}),
                TextStyle,
                FontFamily,
                ListItem,
                OrderedList,
                BulletList,
                CharacterCount,
                History,
                Collaboration.configure({
                    document: provider.document
                }),
                CollaborationCursor.configure({
                    provider,
                    user: {
                        name: userName,
                        color: "#f783ac",
                    }
                })
            ],
            editorProps: {
                attributes: { class: "h-screen w-full sm:w-3/2  md:w-1/2 m-5 p-8 bg-slate-100 rounded  text-black no-scrollbar overflow-auto w-3/4 mx-auto" }
            },
            onUpdate: ({ editor }) => {
                const json = editor.getJSON()

            },
        }
        return EditorConf
    }
    else {
        const EditorConf = {
            extensions: [
                Document,
                Paragraph,
                Text,
                Bold,
                Heading.configure({ levels: [1, 2, 3], }),
                Italic,
                Underline,
                TextAlign.configure({ types: ['heading', 'paragraph',], }),
                SpeechRecognition.configure({lang: 'en-EN',}),
                TextStyle,
                FontFamily,
                ListItem,
                OrderedList,
                BulletList,
                CharacterCount,
                History,
            ],
            editorProps: {
                attributes: { class: "h-screen w-full sm:w-3/2  md:w-1/2 m-5 p-8 bg-slate-100 rounded  text-black no-scrollbar overflow-auto w-3/4 mx-auto" }
            },
            onUpdate: ({ editor }) => {
                const json = editor.getJSON()

            },
        }
        return EditorConf
    }
}

