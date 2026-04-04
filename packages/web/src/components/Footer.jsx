export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          Luxview<span className="footer-dot"></span>
        </div>
        <div className="footer-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <span className="footer-copy">&copy; {new Date().getFullYear()} Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
