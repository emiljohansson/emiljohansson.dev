import { Html, Head, Main, NextScript } from 'next/document'

const name = 'Emil Johansson'
export const siteTitle = 'emiljohansson.dev'

export default function Document () {
  return (
    <Html lang="en">
      <Head>
      <link rel="icon" href="/favicon.ico" />
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
      </Head>
      <body className="dark:bg-black-rich dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
