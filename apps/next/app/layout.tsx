'use client'

import 'shared/globals.css'
import '../styles/globals.css'
import Script from 'next/script'

const name = 'Emil Johansson'
const siteTitle = 'emiljohansson.dev'

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.toggle(\'dark\', localStorage.theme === \'dark\')',
          }}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png" />
        <link rel="manifest" href="/images/logo/site.webmanifest" />
        <meta name="author" content={name} />
        <meta name="description" content="Emil's development playground." />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="dark:bg-black-rich dark:text-white">
        <main>{children}</main>
      </body>
    </html>
  )
}
