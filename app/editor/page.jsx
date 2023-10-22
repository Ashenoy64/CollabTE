"use client"

import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'
import Tiptap from '@/components/Tiptap'
import Editor from '../lib/editor'
import TextAllign from "@/components/TextAllign"
import BoldText from '@/components/Bold'
import ItalicText from '@/components/Italic'
import Underline from '@/components/Underline'
import HeadingText from '@/components/Heading'
import Fonts from '@/components/Fonts'
import Numbers from '@/components/Numbers'
import WordCounter from '@/components/WordCounter'
export default () => {
  const editor = useEditor(
    Editor
  )

  if (!editor) {
    return null
  }

  return (
    <div>
        <HeadingText editor={editor}/>
        <WordCounter editor={editor}/>
        <Fonts editor={editor}/>
        <BoldText  editor={editor}/>
        <ItalicText editor={editor}/>
        <Underline editor={editor}/>
        <TextAllign editor={editor}/>
        <Numbers editor={editor}/>
        <Tiptap editor={editor} />
        
    </div>
  )
}