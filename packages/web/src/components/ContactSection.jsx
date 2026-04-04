import { useRevealAnimation } from '../hooks/useRevealAnimation'

export default function ContactSection() {
  const sectionRef = useRevealAnimation()

  return (
    <section className="section section-contact" id="contato">
      <div className="contact-watermark" aria-hidden="true">Luxview</div>
      <div className="section-inner" ref={sectionRef}>
        <div className="section-eyebrow">Contato</div>
        <h2 className="contact-heading">
          Start a <span className="contact-heading-italic">Project.</span>
        </h2>
        <a href="mailto:contato@luxview.com.br" className="contact-btn">
          <span>contato@luxview.com.br</span>
        </a>
      </div>
    </section>
  )
}
