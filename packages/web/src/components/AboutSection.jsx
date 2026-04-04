import { useScrollNarrative } from '../hooks/useScrollNarrative'

export default function AboutSection() {
  const sectionRef = useScrollNarrative()

  return (
    <section className="scroll-section about-section" id="sobre" ref={sectionRef}>
      <div className="scroll-sticky">
        <div className="narrative-block">
          <div className="narrative-text narrative-large" data-scroll-fade="0,0.15">
            <svg className="narrative-illustration" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="8" stroke="var(--amber)" strokeWidth="1.5" opacity="0.6"/>
              <path d="M40 28v-8M40 60v-8M28 40h-8M60 40h-8" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
              <path d="M30 30l-4-4M50 30l4-4M30 50l-4 4M50 50l4 4" stroke="var(--amber)" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
            </svg>
            <p>Nascemos de uma <strong>inspiração</strong>.</p>
          </div>

          <div className="narrative-text" data-scroll-fade="0.25,0.40">
            <svg className="narrative-illustration" viewBox="0 0 80 80" fill="none">
              <path d="M40 55c-10 0-18-8-18-18s8-18 18-18 18 8 18 18" stroke="var(--amber)" strokeWidth="1.5" opacity="0.5"/>
              <path d="M25 60l5-8M55 60l-5-8M40 62v-7" stroke="var(--amber)" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
              <circle cx="40" cy="37" r="4" fill="var(--amber)" opacity="0.2"/>
            </svg>
            <p>Como aquela luz que surge inesperadamente e transforma a maneira como vemos o mundo.</p>
          </div>

          <div className="narrative-text" data-scroll-fade="0.50,0.65">
            <svg className="narrative-illustration" viewBox="0 0 80 80" fill="none">
              <path d="M40 20Q32 35 35 50Q37 58 40 60Q43 58 45 50Q48 35 40 20Z" fill="none" stroke="var(--amber)" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="40" cy="14" r="4" fill="var(--amber)" opacity="0.3"/>
              <path d="M40 14v-2M36 14h-2M44 14h2" stroke="var(--amber)" strokeWidth="1" opacity="0.4"/>
              <line x1="40" y1="60" x2="40" y2="72" stroke="var(--ink-tertiary)" strokeWidth="1.5" opacity="0.4"/>
            </svg>
            <p>Assim como Newton sob a macieira, acreditamos que os maiores avanços vêm de momentos de clareza.</p>
          </div>

          <div className="narrative-text narrative-emphasis" data-scroll-fade="0.75,0.92">
            <svg className="narrative-illustration" viewBox="0 0 80 80" fill="none">
              <path d="M20 55L40 25L60 55" stroke="var(--amber)" strokeWidth="1.5" opacity="0.4" fill="none"/>
              <path d="M28 50L40 32L52 50" stroke="var(--amber)" strokeWidth="1.5" opacity="0.6" fill="none"/>
              <circle cx="40" cy="28" r="3" fill="var(--amber)" opacity="0.3"/>
              <path d="M35 60h10" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
            </svg>
            <p>Nossa missão é levar essa clareza para empresas que buscam alcançar o nível máximo de satisfação dos seus clientes.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
