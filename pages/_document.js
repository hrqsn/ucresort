import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang='ja'>
        <Head>
          <meta name='theme-color' content='#ffffff' />
          <link rel='apple-touch-icon' href='/favicons/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
          <link rel='icon' type='image/png' href='/favicons/android-chrome-256x256.png' sizes='256x256' />
          <link rel='manifest' href='/favicons/site.webmanifest' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
