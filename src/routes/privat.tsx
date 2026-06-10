import { createFileRoute } from '@tanstack/react-router'
import { WavyLine } from '../components/ui/WavyLine'

export const Route = createFileRoute('/privat')({
  component: PrivatPage,
})

const EVENT_TYPES = [
  { icon: 'heart', title: 'Lagzi', desc: 'Intim, max 80 fős esküvők' },
  { icon: 'cake', title: 'Tejfakasztó', desc: 'Baby shower zine stílusban' },
  { icon: 'party', title: 'Szülinap', desc: 'Komoly buli, hajnalig' },
  { icon: 'users', title: 'Céges', desc: 'Csapatépítő vagy év végi' },
]

function PrivatPage() {
  return (
    <div className="px-4 md:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mono text-sm text-menny-yellow uppercase tracking-widest">
          Csak a tiétek lesz
        </p>
        <h1 className="display text-6xl md:text-8xl">
          Privát<span className="text-menny-red">*</span> esték
        </h1>
        <WavyLine className="w-64 h-3 text-menny-red mt-2" />

        <p className="mt-6 max-w-2xl text-lg text-menny-cream/85 leading-relaxed">
          Volt itt már lagzi, tejfakasztó, harmincadik szülinapi meglepetés és kis céges
          karácsony is. Az egész teret kibérelheted — hangosítással, vetítővel, és ha kéred,
          dj-vel együtt.
        </p>

        <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EVENT_TYPES.map((item) => (
            <div key={item.title} className="poster-card p-5 grain relative" style={{ transform: 'rotate(-1deg)' }}>
              <EventIcon name={item.icon} />
              <p className="display text-2xl mt-2">{item.title}</p>
              <p className="text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="poster-yellow p-6 grain relative" style={{ transform: 'rotate(0.8deg)' }}>
            <h2 className="display text-3xl">Mit kapsz</h2>
            <ul className="mt-3 mono text-sm space-y-1.5">
              <li>&middot; az egész L alakú pinceboltozat</li>
              <li>&middot; kb. 80 fő (állva), 50 fő (ülve)</li>
              <li>&middot; bárpult + szakember csapat</li>
              <li>&middot; hangosítás, vetítő, mikrofon</li>
              <li>&middot; alapdekoráció (zine stílus)</li>
              <li>&middot; DJ / élő zenekar opcionálisan</li>
            </ul>
          </div>
          <div className="border-2 border-menny-cream/30 p-6">
            <h2 className="display text-3xl text-menny-yellow">Mennyibe kerül</h2>
            <p className="mt-2 mono text-sm text-menny-cream/85">
              Az ár függ a naptól, a létszámtól és a fogyasztástól. Hétköznap kedvezőbb,
              mint hétvégén. Küldj egy üzenetet, és 48 órán belül adunk ajánlatot.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="poster-card p-6 md:p-10 grain relative" style={{ transform: 'rotate(-0.5deg)' }}>
            <h2 className="display text-3xl md:text-4xl">Kérj árajánlatot</h2>
            <form className="mt-6 grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mono text-xs uppercase block mb-1">Neved</span>
                  <input type="text" required className="w-full px-3 py-2 bg-white border-2 border-menny-black mono text-sm" name="name" />
                </label>
                <label className="block">
                  <span className="mono text-xs uppercase block mb-1">E-mail</span>
                  <input type="email" required className="w-full px-3 py-2 bg-white border-2 border-menny-black mono text-sm" name="email" />
                </label>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <label className="block">
                  <span className="mono text-xs uppercase block mb-1">Alkalom</span>
                  <input type="text" required className="w-full px-3 py-2 bg-white border-2 border-menny-black mono text-sm" name="occasion" />
                </label>
                <label className="block">
                  <span className="mono text-xs uppercase block mb-1">Dátum</span>
                  <input type="date" required className="w-full px-3 py-2 bg-white border-2 border-menny-black mono text-sm" name="date" />
                </label>
                <label className="block">
                  <span className="mono text-xs uppercase block mb-1">Létszám</span>
                  <input type="number" required className="w-full px-3 py-2 bg-white border-2 border-menny-black mono text-sm" name="guests" />
                </label>
              </div>
              <label className="block">
                <span className="mono text-xs uppercase block mb-1">Egyéb (catering, dekor, zene)</span>
                <textarea name="notes" required rows={4} className="w-full px-3 py-2 bg-white border-2 border-menny-black mono text-sm" />
              </label>
              <button type="submit" className="btn-primary w-fit">Küldés</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

function EventIcon({ name }: { name: string }) {
  const cls = "w-6 h-6 text-menny-red"
  switch (name) {
    case 'heart':
      return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>)
    case 'cake':
      return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" /><path d="M2 21h20" /><path d="M7 8v3" /><path d="M12 8v3" /><path d="M17 8v3" /><path d="M7 4h.01" /><path d="M12 4h.01" /><path d="M17 4h.01" /></svg>)
    case 'party':
      return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true"><path d="M5.8 11.3 2 22l10.7-3.79" /><path d="M4 3h.01" /><path d="M22 8h.01" /><path d="M15 2h.01" /><path d="M22 20h.01" /><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" /><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" /><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" /><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" /></svg>)
    case 'users':
      return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>)
    default:
      return null
  }
}
