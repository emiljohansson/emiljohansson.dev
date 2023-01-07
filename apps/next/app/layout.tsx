import 'shared/globals.css'

import { PropsWithChildren } from 'react'

export default function Layout ({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className="h-full">
      <body className="dark:bg-black-rich dark:text-white h-full">
        <main className="h-full">
          {children}
        </main>
      </body>
    </html>)
}
