import { useRevealAnimation } from '../hooks/useRevealAnimation'

export default function ValuesSection() {
  const ref = useRevealAnimation()

  return (
    <section className="section section-values" ref={ref}>
      <div className="values-row">
        <div className="value-pillar">
          <div className="value-num-outline">01</div>
          <h3 className="value-title">Visão Estrutural</h3>
          <p className="value-desc">Arquitetura em primeiro lugar. Sistemas altamente escaláveis projetados para suportar carga computacional sem sacrificar performance.</p>
        </div>
        <div className="value-pillar">
          <div className="value-num-outline">02</div>
          <h3 className="value-title">Escala Cinematográfica</h3>
          <p className="value-desc">Modelos de iluminação complexos, renderização baseada em física e storytelling imersivo através do scroll.</p>
        </div>
        <div className="value-pillar">
          <div className="value-num-outline">03</div>
          <h3 className="value-title">Fluxo Cinético</h3>
          <p className="value-desc">Micro-interações que definem a sensação subconsciente do software, mapeadas para a expectativa humana.</p>
        </div>
      </div>
    </section>
  )
}
