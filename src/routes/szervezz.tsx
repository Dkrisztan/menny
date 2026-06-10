import { createFileRoute } from '@tanstack/react-router'
import { WavyLine } from '../components/ui/WavyLine'
import { Asterisk } from '../components/ui/Asterisk'

export const Route = createFileRoute('/szervezz')({
  component: SzerezzPage,
})

function SzerezzPage() {
  return (
    <div className="px-4 md:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mono text-sm text-menny-yellow uppercase tracking-widest">
          Programszervezőknek
        </p>
        <h1 className="display text-6xl md:text-8xl">
          Szervezz<span className="text-menny-red">*</span> nálunk
        </h1>
        <WavyLine className="w-64 h-3 text-menny-red mt-2" />

        <p className="mt-6 max-w-2xl text-lg text-menny-cream/85 leading-relaxed">
          Csinálnál nálunk filmklubot, koncertet, könyvbemutatót, beszélgetős estét,
          kísérleti dolgot, amit csak el tudsz képzelni egy pinceboltozatban? Írj —
          szeretjük, ha a programjainkat ti hozzátok.
        </p>

        <section className="mt-10 grid sm:grid-cols-3 gap-4">
          <div className="poster-card p-4 grain relative" style={{ transform: 'rotate(-1deg)' }}>
            <p className="mono text-xs uppercase">Férőhely</p>
            <p className="display text-2xl">kb. 80 fő</p>
          </div>
          <div className="poster-card p-4 grain relative" style={{ transform: 'rotate(-1deg)' }}>
            <p className="mono text-xs uppercase">Színpad</p>
            <p className="display text-2xl">3×4 m</p>
          </div>
          <div className="poster-card p-4 grain relative" style={{ transform: 'rotate(-1deg)' }}>
            <p className="mono text-xs uppercase">Vetítő</p>
            <p className="display text-2xl">Full HD</p>
          </div>
        </section>

        <section className="mt-16 relative">
          <Asterisk className="absolute -top-6 -left-6 w-12 h-12 text-menny-red rotate-12" />
          <div className="poster-yellow p-6 md:p-10 grain relative" style={{ transform: 'rotate(-0.6deg)' }}>
            <h2 className="display text-3xl md:text-4xl">Kapcsolat</h2>
            <form className="mt-6 grid gap-4">
              <label className="block">
                <span className="mono text-xs uppercase block mb-1">Neved</span>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                  name="name"
                />
              </label>
              <label className="block">
                <span className="mono text-xs uppercase block mb-1">E-mail</span>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                  name="email"
                />
              </label>
              <label className="block">
                <span className="mono text-xs uppercase block mb-1">Esemény típusa (pl. filmklub)</span>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                  name="event_type"
                />
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mono text-xs uppercase block mb-1">Várható létszám</span>
                  <input
                    type="number"
                    required
                    className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                    name="attendees"
                  />
                </label>
                <label className="block">
                  <span className="mono text-xs uppercase block mb-1">Tervezett dátum</span>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                    name="date"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mono text-xs uppercase block mb-1">Pár mondat az ötletről</span>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                />
              </label>
              <button type="submit" className="btn-primary w-fit">Küldés</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
