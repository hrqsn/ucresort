import Seo from './seo'
import Header from './header'
import Footer from './footer'

export default function Layout ({ children }) {
  return (
    <>
      <Seo />
      <Header />
      {children}
      <Footer />
    </>
  )
}
