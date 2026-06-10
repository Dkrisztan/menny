import { Link } from '@tanstack/react-router'
import { Asterisk } from '../ui/Asterisk'

export function CtaSection() {
  return (
    <section className="px-4 md:px-6 py-20">
      <div className="mx-auto max-w-5xl text-center relative">
        <Asterisk className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 text-menny-red" />
        <h2 className="display text-5xl md:text-7xl">
          Találkozzunk a <span className="text-menny-yellow">Mennyben</span>.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/programok" className="btn-primary">Programok</Link>
          <Link to="/kapcsolat" className="btn-secondary">Írj nekünk</Link>
        </div>
      </div>
    </section>
  )
}
