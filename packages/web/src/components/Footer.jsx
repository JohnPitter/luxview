import { useRevealAnimation } from '../hooks/useRevealAnimation'

export default function Footer() {
  const ref = useRevealAnimation()

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-inner">
        <span className="footer-brand">Luxview</span>
        <span className="footer-copy">&copy; {new Date().getFullYear()} Luxview. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
