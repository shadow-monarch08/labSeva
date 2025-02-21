import Herosection from '../components/Herosection'
import CheckupSection from '../components/CheckupSection'
import NewsSection from '../components/news/NewsSection'
import Contact from '../components/Contact'
import About from '../components/About'
import Navbar from '../components/Navbar'
import IntroductionContainer from '../components/IntroSection/Index'

const Home = () => {
  return (
    <>
      <Navbar />
      <Herosection />
      <IntroductionContainer />
      <CheckupSection />
      <NewsSection />
      <Contact />
      <About />
    </>
  )
}

export default Home