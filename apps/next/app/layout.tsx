import 'shared/globals.css'

import { PropsWithChildren } from 'react'

export default function Layout ({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en">
      <body className="dark:bg-black-rich dark:text-white">
        <main>
          {children}
        </main>
      </body>
    </html>)
}
