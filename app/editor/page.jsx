"use client"

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
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
import PopMenu from '@/components/PopMenu'
export default () => {
  const editor = useEditor(
    Editor
  )

  if (!editor) {
    return null
  }

  return (
    <div>
        <div className='flex flex-row m-5 justify-center content-center items-center bg-zinc-800'>
                <PopMenu editor={editor}/>
                <HeadingText editor={editor}/>
                <WordCounter editor={editor}/>
                <Fonts editor={editor}/>
                <BoldText  editor={editor}/>
                <ItalicText editor={editor}/>
                <Underline editor={editor}/>
                <TextAllign editor={editor}/>
                <Numbers editor={editor}/>
        </div>
        <Tiptap editor={editor} />
        
    </div>
  )
}