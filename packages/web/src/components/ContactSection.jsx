import { useRevealAnimation } from '../hooks/useRevealAnimation'

export default function ContactSection() {
  const sectionRef = useRevealAnimation()

  return (
    <section className="section section-contact" id="contato">
      <div className="section-inner" ref={sectionRef}>
        <div className="section-eyebrow">Contato</div>
        <h2 className="section-heading">
          Vamos iluminar o seu<br/>próximo projeto?
        </h2>
        <p className="contact-lead">
          Cada grande transformação começa com uma conversa.
        </p>
        <a href="mailto:contato@luxview.com.br" className="contact-btn">
          <span>Iniciar Conversa</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
