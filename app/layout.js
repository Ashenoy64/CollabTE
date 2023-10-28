import './globals.css'



export const metadata = {
  title: 'CollabTE',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="no-scrollbar  flex flex-col justify-center w-full ">
        {children}
      </body>
    </html>
  )
}
