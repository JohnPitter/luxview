export default function LogoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <line x1="20" y1="22" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 8 Q12 15 14 22 Q16 26 20 27 Q24 26 26 22 Q28 15 20 8Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="30" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M19 29 L22 28 L22 30 L19 30Z" fill="currentColor" opacity="0.4"/>
      <circle cx="20" cy="4" r="2" fill="var(--gold)" opacity="0.8"/>
      <line x1="20" y1="2" x2="20" y2="0" stroke="var(--gold)" strokeWidth="1" opacity="0.6"/>
      <line x1="16" y1="3" x2="14" y2="1" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4"/>
      <line x1="24" y1="3" x2="26" y2="1" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  )
}
