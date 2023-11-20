import './globals.css'
import React from "react";
import Autocomplete from '@/components/Autocomplete'

export const metadata = {
  title: 'CollabTE',
}

/*
  Wrapper function to enclose all the components
*/
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="no-scrollbar  flex flex-col justify-center w-full ">
      {/* <Autocomplete suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]}/> */}
        {children}
      </body>
    </html>
  )
}
