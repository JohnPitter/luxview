import Nav from '../components/Nav'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ValuesSection from '../components/ValuesSection'
import ServicesSection from '../components/ServicesSection'
import IdeaSection from '../components/IdeaSection'
import ProjectsSection from '../components/ProjectsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <ServicesSection />
      <IdeaSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  )
}
