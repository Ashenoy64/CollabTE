"use client"

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import React, { useEffect } from 'react'
import Tiptap from '@/components/Tiptap'
import Editor from '../lib/editor'
import MenuBar from '@/components/MenuBar'
import Footer from '@/components/Footer'
import PopMenu from '@/components/PopMenu'
import { auth } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
export default () => {

  const [user,setUser]=useState("")
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } 
    });
  }, []);

  
  const editor = useEditor(
    Editor)
  

  if (!editor) {
    return null
  }

  
  return (
    <div className=' flex flex-col justify-center'>
                <PopMenu editor={editor}/>
        <div className='w-full p-2 flex flex-col justify-center'>
            <MenuBar editor={editor}></MenuBar>
        </div>
        <Tiptap editor={editor} />
        <div>
          <Footer editor={editor} />

        </div>
    </div>
  )
}