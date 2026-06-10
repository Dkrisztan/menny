import { Link } from '@tanstack/react-router'

export function About() {
  return (
    <section className="px-4 md:px-6 py-20 bg-menny-cream/5">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="mono text-sm text-menny-red uppercase tracking-widest">Rólunk röviden</p>
          <h2 className="display text-4xl md:text-6xl mt-2 text-menny-cream">
            Két filmes srác,<br />
            <span className="text-menny-yellow">egy pinceboltozat.</span>
          </h2>
          <p className="mt-6 text-menny-cream/85 leading-relaxed">
            2025 októberében nyitottuk a Menny<span className="text-menny-red">*</span>-et —
            frissen végzett rendezőként arra vágytunk, hogy legyen egy közös hely, ahova a
            barátaink, a tanáraink és az ismeretlen jó arcok is beülhetnek egy estére. Nem
            klasszikus italmérés: itt lehet jazzt jamelni, Tarr Bélát nézni, kalotaszegit
            táncolni, vagy csak csendben olvasni a sarokban.
          </p>
          <Link to="/a-hely" className="btn-secondary mt-6">
            A hely története &rarr;
          </Link>
        </div>

        <div className="grid gap-4">
          {/* Opening hours card */}
          <div className="poster-card p-5 grain relative" style={{ transform: 'rotate(1.5deg)' }}>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-menny-red" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <h3 className="display text-2xl">Nyitva</h3>
            </div>
            <ul className="mt-3 mono text-sm space-y-1">
              <li className="flex justify-between"><span>Hétfő – Kedd</span><span>17:00 – 24:00</span></li>
              <li className="flex justify-between"><span>Sze – Csü</span><span>17:00 – 01:00</span></li>
              <li className="flex justify-between"><span>Pé – Szo</span><span>17:00 – 03:00</span></li>
              <li className="flex justify-between text-menny-red"><span>Vasárnap</span><span>Zárva</span></li>
            </ul>
          </div>

          {/* Location card */}
          <div className="poster-yellow p-5 grain relative" style={{ transform: 'rotate(-1.5deg)' }}>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h3 className="display text-2xl">Hol</h3>
            </div>
            <p className="mt-3 mono text-sm">
              1062 Budapest, Szobi utca 4.<br />
              A Nyugati pályaudvartól 2 perc séta. M3, 4-6-os villamos.
            </p>
            <a
              href="https://maps.google.com/?q=Szobi+utca+4,+Budapest"
              target="_blank"
              rel="noopener"
              className="mt-3 inline-block underline mono text-sm"
            >
              Mutasd a térképen &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
