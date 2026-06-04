import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import AgenticModel from './components/AgenticModel'
import Services from './components/Services'
import Ventures from './components/Ventures'
import Governance from './components/Governance'
import Process from './components/Process'
import Activity from './components/Activity'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-950 text-white">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <AgenticModel />
        <Services />
        <Process />
        <Ventures />
        <Governance />
        <Activity />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
