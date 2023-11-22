import './globals.css'
import React from "react";
import Autocomplete from "C:/Users/User/Desktop/CollaborativeEditor-1/components/Autocomplete.js";



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
        {children}
      </body>
    </html>
  )
}
