import { useState } from 'react'
import { Asterisk } from '../ui/Asterisk'
import { apiPost } from '../../lib/strapi'

export function Reservation() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [partySize, setPartySize] = useState('')
  const [reservedFor, setReservedFor] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await apiPost('/api/reservations', {
        name,
        email,
        partySize: parseInt(partySize),
        reservedFor: new Date(reservedFor).toISOString(),
        description: description.trim() || undefined,
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setPartySize('')
        setReservedFor('')
        setDescription('')
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg(data?.error ?? 'Hiba történt, próbáld újra.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Nem sikerült elküldeni. Ellenőrizd a kapcsolatot.')
      setStatus('error')
    }
  }

  return (
    <section className="px-4 md:px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mono text-sm text-menny-yellow uppercase tracking-widest">
          Asztalfoglalás
        </p>
        <h2 className="display text-4xl md:text-6xl mt-2">
          Foglalj<span className="text-menny-red">*</span> asztalt
        </h2>

        <div className="mt-10 relative">
          <Asterisk className="absolute -top-6 -right-4 w-10 h-10 text-menny-red rotate-12 hidden md:block" />

          {status === 'success' ? (
            <div className="poster-yellow p-8 grain relative" style={{ transform: 'rotate(-0.5deg)' }}>
              <h3 className="display text-2xl md:text-3xl">Köszönjük!</h3>
              <p className="mt-3 mono text-sm">
                Küldtünk egy megerősítő e-mailt. Kattints a linkre benne, és máris
                látjuk a foglalásod.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-primary mt-6"
              >
                Új foglalás
              </button>
            </div>
          ) : (
            <div className="poster-yellow p-6 md:p-10 grain relative" style={{ transform: 'rotate(-0.6deg)' }}>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mono text-xs uppercase block mb-1">Neved</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="mono text-xs uppercase block mb-1">E-mail</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                    />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mono text-xs uppercase block mb-1">Létszám</span>
                    <input
                      type="number"
                      required
                      min={1}
                      max={30}
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="mono text-xs uppercase block mb-1">Mikor</span>
                    <input
                      type="datetime-local"
                      required
                      value={reservedFor}
                      onChange={(e) => setReservedFor(e.target.value)}
                      className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mono text-xs uppercase block mb-1">Megjegyzés (opcionális)</span>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-menny-cream border-2 border-menny-black mono text-sm"
                  />
                </label>

                {status === 'error' && (
                  <p className="mono text-sm text-menny-red">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-fit disabled:opacity-50"
                >
                  {status === 'loading' ? 'Küldés...' : 'Foglalás'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
