import { useScrollNarrative } from '../hooks/useScrollNarrative'

export default function ValuesSection() {
  const sectionRef = useScrollNarrative()

  return (
    <section className="scroll-section values-section" ref={sectionRef}>
      <div className="scroll-sticky">
        <div className="values-container">
          <div className="value-block" data-scroll-fade="0,0.22">
            <img
              className="value-image"
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=960&h=540&fit=crop&crop=center"
              alt="Visão - paisagem ampla representando enxergar além"
            />
            <span className="value-num">01</span>
            <h3>Visão</h3>
            <p>Enxergamos além do óbvio para encontrar soluções que encantam.</p>
          </div>
          <div className="value-block" data-scroll-fade="0.32,0.54">
            <img
              className="value-image"
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=960&h=540&fit=crop&crop=center"
              alt="Inovação - tecnologia e conexões digitais"
            />
            <span className="value-num">02</span>
            <h3>Inovação</h3>
            <p>Tecnologia de ponta aplicada com propósito e elegância.</p>
          </div>
          <div className="value-block" data-scroll-fade="0.64,0.90">
            <img
              className="value-image"
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=960&h=540&fit=crop&crop=center"
              alt="Excelência - precisão e qualidade"
            />
            <span className="value-num">03</span>
            <h3>Excelência</h3>
            <p>Cada detalhe importa na construção de experiências memoráveis.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
