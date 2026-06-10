import { Link } from '@tanstack/react-router'
import { Asterisk } from '../ui/Asterisk'
import { WavyLine } from '../ui/WavyLine'

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-menny-black/60 bg-menny-black/80">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="inline-flex items-baseline gap-1 display text-4xl">
            <span>Menny</span>
            <Asterisk className="w-7 h-7 -translate-y-[0.15em] text-menny-red" />
          </span>
          <p className="mt-4 max-w-sm text-menny-cream/80">
            Kultúrkocsma a Nyugatinál. Koncert, jazz, filmklub, táncház — egy L alakú
            pinceboltozatban, lomis bútorokkal.
          </p>
          <div className="mt-6">
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
                <button type="submit" className="btn-primary !py-2 !text-sm">
                  Megyek
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <h3 className="display text-xl text-menny-yellow">Találd meg</h3>
          <WavyLine className="w-32 h-2 text-menny-red my-2" />
          <ul className="space-y-2 mono text-sm">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>1062 Budapest, Szobi utca 4.</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <a href="mailto:hello@menny.hu" className="hover:text-menny-yellow">hello@menny.hu</a>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              <a href="tel:+3617778888" className="hover:text-menny-yellow">+36 1 777 8888</a>
            </li>
            <li className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-menny-yellow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-menny-yellow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="display text-xl text-menny-yellow">Oldalak</h3>
          <WavyLine className="w-32 h-2 text-menny-red my-2" />
          <ul className="space-y-2 text-sm">
            <li><Link to="/programok" className="hover:text-menny-yellow">Programok</Link></li>
            <li><Link to="/a-hely" className="hover:text-menny-yellow">A hely</Link></li>
            <li><Link to="/szervezz" className="hover:text-menny-yellow">Szervezz nálunk</Link></li>
            <li><Link to="/privat" className="hover:text-menny-yellow">Privát események</Link></li>
            <li><Link to="/kapcsolat" className="hover:text-menny-yellow">Kapcsolat</Link></li>
            <li><a href="/aszf" className="hover:text-menny-yellow">ÁSZF</a></li>
            <li><a href="/adatvedelem" className="hover:text-menny-yellow">Adatkezelés</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-menny-black/60 py-4 text-center mono text-xs text-menny-cream/60">
        &copy; 2026 Menny* Kultúrkocsma &middot; Cégadatok hamarosan
      </div>
    </footer>
  )
}
