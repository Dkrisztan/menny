import { Link } from '@tanstack/react-router'
import { Asterisk } from '../ui/Asterisk'
import { WavyLine } from '../ui/WavyLine'

export function Hero() {
  return (
    <section className="relative px-4 md:px-6 pt-10 md:pt-16 pb-20 overflow-hidden">
      {/* Background collage image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: 'url(/images/hero-collage.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, color-mix(in oklab, var(--color-menny-black) 30%, transparent) 0%, var(--color-menny-black) 90%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <p className="mono text-sm text-menny-yellow uppercase tracking-widest">
            Budapest VI. &middot; Szobi u. 4. &middot; 2025 óta
          </p>

          <img
            src="/images/menny-logo.png"
            alt="Menny* Kultúrkocsma"
            width="1280"
            height="512"
            className="mt-4 w-full max-w-3xl h-auto drop-shadow-[6px_6px_0_var(--color-menny-black)]"
          />

          <p className="mt-2 display text-3xl md:text-5xl text-menny-yellow leading-none">
            Kultúrkocsma a Nyugatinál
          </p>

          <p className="mt-6 max-w-xl text-lg text-menny-cream/85">
            Koncert, jazz jam, filmklub, táncház, pub quiz — egy L alakú pinceboltozatban,
            lomis bútorokkal, két filmes srác kezében. Gyere, ülj le, beszélgess.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/programok" className="btn-primary">
              Heti programok
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link to="/szervezz" className="btn-secondary">
              Szervezz nálunk
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:flex justify-center">
          <div className="relative">
            <Asterisk className="w-64 h-64 text-menny-red" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="display text-2xl text-menny-cream rotate-[-8deg] bg-menny-black px-3 py-1 border-2 border-menny-cream">
                Nyitva!
              </span>
            </div>
          </div>
        </div>
      </div>

      <WavyLine className="relative mt-12 w-full h-3 text-menny-yellow" />
    </section>
  )
}
