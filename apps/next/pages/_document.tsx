import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '@/stitches'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body className="transition duration-500 bg-white dark:bg-gray-800 text-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
