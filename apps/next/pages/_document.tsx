import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '@/stitches';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
