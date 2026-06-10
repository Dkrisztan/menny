import { createFileRoute } from '@tanstack/react-router'
import { WavyLine } from '../components/ui/WavyLine'

export const Route = createFileRoute('/kapcsolat')({
  component: KapcsolatPage,
})

function KapcsolatPage() {
  return (
    <div className="px-4 md:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mono text-sm text-menny-yellow uppercase tracking-widest">Bárki, bármikor</p>
        <h1 className="display text-6xl md:text-8xl">
          Kapcsolat<span className="text-menny-red">*</span>
        </h1>
        <WavyLine className="w-64 h-3 text-menny-red mt-2" />

        <div className="mt-10 grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Address card */}
            <div className="poster-yellow p-6 grain relative" style={{ transform: 'rotate(-1deg)' }}>
              <h2 className="display text-3xl flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Cím
              </h2>
              <p className="mt-2 mono text-sm">
                1062 Budapest, Szobi utca 4.<br />
                A Nyugati pályaudvar mögött, 2 perc gyalog.
              </p>
            </div>

            {/* Hours card */}
            <div className="poster-card p-6 grain relative" style={{ transform: 'rotate(0.8deg)' }}>
              <h2 className="display text-3xl flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-menny-red" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Nyitva
              </h2>
              <ul className="mt-3 mono text-sm space-y-1">
                <li className="flex justify-between"><span>Hé–Ke</span><span>17–24</span></li>
                <li className="flex justify-between"><span>Sze–Csü</span><span>17–01</span></li>
                <li className="flex justify-between"><span>Pé–Szo</span><span>17–03</span></li>
                <li className="flex justify-between text-menny-red"><span>Va</span><span>Zárva</span></li>
              </ul>
            </div>

            {/* Contact info */}
            <div className="border-2 border-menny-cream/30 p-6">
              <h2 className="display text-3xl text-menny-yellow">Írj, hívj, követs</h2>
              <ul className="mt-4 mono text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                  <a href="mailto:hello@menny.hu" className="hover:text-menny-yellow">hello@menny.hu</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>
                  <a href="tel:+3617778888" className="hover:text-menny-yellow">+36 1 777 8888</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <a href="https://instagram.com" className="hover:text-menny-yellow">@mennybudapest</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <a href="https://facebook.com" className="hover:text-menny-yellow">facebook.com/mennybudapest</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="border-2 border-menny-cream/30 p-6">
              <form className="flex flex-col gap-2">
                <label className="display text-lg text-menny-yellow">Heti programajánló</label>
                <p className="mono text-xs text-menny-cream/70">
                  Iratkozz fel — minden hétfőn küldünk egy levelet az aktuális hétről.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="te@email.hu"
                    className="flex-1 px-3 py-2 bg-menny-cream text-menny-black border-2 border-menny-black mono text-sm placeholder:text-menny-black/50"
                  />
                  <button type="submit" className="btn-primary !py-2 !text-sm">Megyek</button>
                </div>
              </form>
            </div>

            <p className="mono text-xs text-menny-cream/60">
              Cégadatok: hamarosan. &middot;{' '}
              <a href="/aszf" className="underline">ÁSZF</a> &middot;{' '}
              <a href="/adatvedelem" className="underline">Adatkezelés</a>
            </p>
          </div>

          {/* Map */}
          <div>
            <div className="border-2 border-menny-cream/30 aspect-square md:aspect-[4/5] overflow-hidden">
              <iframe
                title="Menny Kultúrkocsma térkép"
                src="https://www.openstreetmap.org/export/embed.html?bbox=19.054%2C47.508%2C19.062%2C47.512&layer=mapnik&marker=47.510%2C19.058"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Szobi+utca+4,+Budapest"
              target="_blank"
              rel="noopener"
              className="btn-secondary mt-4 inline-flex"
            >
              Nyisd Google Mapsben &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
