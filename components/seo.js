import { DefaultSeo } from 'next-seo'

const SeoConfig = {
  title: 'Universal Cube Resort',
  description: '世界最高の再現を、お届けしたい。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://ucresort.com',
    site_name: 'Universal Cube Resort',
    title: 'Universal Cube Resort',
    description: '世界最高の再現を、お届けしたい。',
    images: [
      {
        url: 'https://ucresort.com/img/ogp.webp',
        alt: 'Universal Cube Resort'
      }
    ]
  },
  twitter: {
    cardType: 'summary_large_image'
  }
}

export default function Seo () {
  return (
    <>
      <DefaultSeo {...SeoConfig} />
    </>
  )
}
