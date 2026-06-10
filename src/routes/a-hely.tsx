import { createFileRoute } from '@tanstack/react-router'
import { WavyLine } from '../components/ui/WavyLine'
import { Asterisk } from '../components/ui/Asterisk'

export const Route = createFileRoute('/a-hely')({
  component: AHelyPage,
})

const PHOTOS = [
  { bg: 'var(--color-menny-red)', rotate: '-1.5deg', label: 'FOTÓ #1' },
  { bg: 'var(--color-menny-yellow)', rotate: '1.5deg', label: 'FOTÓ #2' },
  { bg: 'var(--color-menny-cream)', rotate: '-1.5deg', label: 'FOTÓ #3' },
  { bg: 'var(--color-menny-red)', rotate: '1.5deg', label: 'FOTÓ #4' },
  { bg: 'var(--color-menny-yellow)', rotate: '-1.5deg', label: 'FOTÓ #5' },
  { bg: 'var(--color-menny-cream)', rotate: '1.5deg', label: 'FOTÓ #6' },
]

const TECH = [
  { icon: 'users', label: 'Férőhely', value: 'kb. 80 fő' },
  { icon: 'mic', label: 'Színpad', value: '3×4 m, alacsony' },
  { icon: 'volume', label: 'Hang', value: 'FOH + monitor' },
  { icon: 'projector', label: 'Vetítő', value: 'Full HD + vászon' },
]

function AHelyPage() {
  return (
    <div className="px-4 md:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mono text-sm text-menny-yellow uppercase tracking-widest">
          1062 Budapest, Szobi u. 4.
        </p>
        <h1 className="display text-6xl md:text-8xl">
          A hely<span className="text-menny-red">*</span>
        </h1>
        <WavyLine className="w-64 h-3 text-menny-red mt-2" />

        <div className="mt-12 grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3 space-y-5 text-menny-cream/85 leading-relaxed">
            <p className="text-xl text-menny-cream">
              2025 októberében két frissen végzett filmes srác kibérelt egy poros
              pinceboltozatot a Nyugati mögött. Két hónap, egy lomtalanítás és kétszáz
              csavar után megnyílt a Menny<span className="text-menny-red">*</span>.
            </p>
            <p>
              A &bdquo;menny&rdquo; nálunk nem vallás, hanem metafora: egy hely, ahova
              fáradtan vagy üresen is lehet jönni, és találsz valakit, aki veled iszik egy
              felest, vagy elmagyarázza a Sátántangót. Nem klasszikus kocsma — közösségi tér,
              amit a programjai építenek.
            </p>
            <p>
              Hétközben jazz jam, táncház, filmklub. Hétvégén koncertek és kvízek. Vasárnap
              pihenünk, mert a hét rövid.
            </p>
          </div>
          <div className="md:col-span-2 relative">
            <Asterisk className="w-48 h-48 text-menny-yellow mx-auto" />
            <p className="text-center mono text-xs mt-3 text-menny-cream/60">
              * a brand jegyünk — kézzel rajzolt, mint minden más
            </p>
          </div>
        </div>

        {/* Photo gallery */}
        <section className="mt-20">
          <h2 className="display text-4xl md:text-5xl text-menny-yellow">A tér</h2>
          <WavyLine className="w-40 h-2 text-menny-red my-2" />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {PHOTOS.map((photo) => (
              <div
                key={photo.label}
                className="aspect-[4/3] border-2 border-menny-black grain relative flex items-center justify-center"
                style={{
                  background: photo.bg,
                  transform: `rotate(${photo.rotate})`,
                  boxShadow: '5px 5px 0 0 var(--color-menny-black)',
                }}
              >
                <span className="display text-2xl text-menny-black/30">{photo.label}</span>
              </div>
            ))}
          </div>
          <p className="mono text-xs text-menny-cream/50 mt-3">
            * Itt lesznek az igazi fotók, amint a galéria elkészül.
          </p>
        </section>

        {/* Tech & space */}
        <section className="mt-20">
          <h2 className="display text-4xl md:text-5xl text-menny-yellow">Tech &amp; tér</h2>
          <WavyLine className="w-40 h-2 text-menny-red my-2" />
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TECH.map((item) => (
              <div
                key={item.label}
                className="poster-card p-5 grain relative"
                style={{ transform: 'rotate(-1deg)' }}
              >
                <TechIcon name={item.icon} />
                <p className="mono text-xs uppercase mt-2">{item.label}</p>
                <p className="display text-2xl mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Getting there */}
        <section className="mt-20">
          <h2 className="display text-4xl md:text-5xl text-menny-yellow">Megközelítés</h2>
          <WavyLine className="w-40 h-2 text-menny-red my-2" />
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="poster-yellow p-6 grain relative" style={{ transform: 'rotate(-1deg)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="display text-3xl mt-2">Szobi u. 4.</p>
              <p className="mono text-sm mt-2">
                Nyugati pályaudvartól 2 perc gyalog. M3-as metró, 4-6-os villamos. Éjszakai
                busz: 906, 923.
              </p>
            </div>
            <div className="border-2 border-menny-cream/30 aspect-video overflow-hidden">
              <iframe
                title="Menny térkép"
                src="https://www.openstreetmap.org/export/embed.html?bbox=19.054%2C47.508%2C19.062%2C47.512&layer=mapnik&marker=47.510%2C19.058"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function TechIcon({ name }: { name: string }) {
  switch (name) {
    case 'users':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-menny-red" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" />
        </svg>
      )
    case 'mic':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-menny-red" aria-hidden="true">
          <path d="M12 19v3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><rect x="9" y="2" width="6" height="13" rx="3" />
        </svg>
      )
    case 'volume':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-menny-red" aria-hidden="true">
          <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6" /><path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
        </svg>
      )
    case 'projector':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-menny-red" aria-hidden="true">
          <path d="M5 7 3 5" /><path d="M9 6V3" /><path d="m13 7 2-2" /><circle cx="9" cy="13" r="3" /><path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" /><path d="M16 16h2" />
        </svg>
      )
    default:
      return null
  }
}
