import Head from 'next/head'
import Hero from '@/components/home-hero'

export default function Home () {
  return (
    <>
      <Head>
        <title>トップ - Universal Cube Resort</title>
      </Head>

      <Hero />
    </>
  )
}
