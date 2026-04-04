import { useScrollNarrative } from '../hooks/useScrollNarrative'

export default function AboutSection() {
  const sectionRef = useScrollNarrative()

  return (
    <section className="scroll-section about-section" id="sobre" ref={sectionRef}>
      <div className="scroll-sticky">
        <div className="narrative-block">
          <div className="narrative-label" data-scroll-fade="0,0.92">
            <span>01 — Manifesto</span>
          </div>
          <div className="narrative-content">
            <div className="narrative-text narrative-large" data-scroll-fade="0,0.15">
              <h2 className="narrative-heading">
                <span className="narrative-heading-dim">Beyond visual.</span>
                <span className="narrative-heading-light">Visceral engineering.</span>
              </h2>
            </div>

            <div className="narrative-text" data-scroll-fade="0.25,0.40">
              <p><span className="narrative-drop-cap">N</span>ascemos de uma inspiração. Como aquela luz que surge inesperadamente e transforma a maneira como vemos o mundo.</p>
            </div>

            <div className="narrative-text" data-scroll-fade="0.50,0.65">
              <p>Assim como Newton sob a macieira, acreditamos que os maiores avanços vêm de momentos de clareza. Cada pixel é intencional. Cada transição carrega peso.</p>
            </div>

            <div className="narrative-text narrative-emphasis" data-scroll-fade="0.75,0.92">
              <p>Nossa missão é levar essa clareza para empresas que buscam alcançar o nível máximo de satisfação dos seus clientes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
