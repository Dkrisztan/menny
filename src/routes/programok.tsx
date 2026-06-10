import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { WavyLine } from '../components/ui/WavyLine'
import { events } from '../data/events'

export const Route = createFileRoute('/programok')({
  component: ProgramokPage,
})

const CATEGORIES = ['Koncert', 'Jazz', 'Táncház', 'Filmklub', 'Quiz', 'Egyéb']

function ProgramokPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [view, setView] = useState<'lista' | 'naptar'>('lista')

  const now = new Date()
  const upcoming = events.filter((e) => new Date(e.date) >= now)
  const archive = events.filter((e) => new Date(e.date) < now)

  const filteredUpcoming = activeFilters.length
    ? upcoming.filter((e) => activeFilters.includes(e.category))
    : upcoming

  const toggleFilter = (category: string) => {
    setActiveFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    )
  }

  return (
    <div className="px-4 md:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="mono text-sm text-menny-yellow uppercase tracking-widest">Mi lesz itt</p>
        <h1 className="display text-6xl md:text-8xl text-menny-cream">
          Programok<span className="text-menny-red">*</span>
        </h1>
        <WavyLine className="w-64 h-3 text-menny-red mt-2" />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilters.includes(cat)
              return (
                <button
                  key={cat}
                  onClick={() => toggleFilter(cat)}
                  className={`chip transition-colors ${
                    isActive
                      ? 'text-menny-black bg-menny-yellow border-menny-yellow'
                      : 'text-menny-cream border-menny-cream/40 hover:border-menny-yellow hover:text-menny-yellow'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
          <div className="inline-flex border-2 border-menny-cream">
            <button
              onClick={() => setView('lista')}
              className={`px-4 py-2 mono text-sm uppercase ${
                view === 'lista' ? 'bg-menny-cream text-menny-black' : 'text-menny-cream'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setView('naptar')}
              className={`px-4 py-2 mono text-sm uppercase border-l-2 border-menny-cream ${
                view === 'naptar' ? 'bg-menny-cream text-menny-black' : 'text-menny-cream'
              }`}
            >
              Naptár
            </button>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {filteredUpcoming.length === 0 ? (
            <p className="col-span-full mono text-menny-cream/70">
              Ezzel a szűrővel nincs program. Vegyél le egyet.
            </p>
          ) : (
            filteredUpcoming.map((event) => (
              <div key={event.id} className="poster-card p-5 grain relative" style={{ transform: 'rotate(-1deg)' }}>
                <p className="mono text-xs uppercase opacity-70">{event.category}</p>
                <p className="display text-2xl mt-1">{event.title}</p>
                <p className="mono text-xs mt-2">{formatDate(event.date)}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-24">
          <h2 className="display text-4xl md:text-5xl text-menny-yellow">Archív*</h2>
          <WavyLine className="w-32 h-2 text-menny-red my-3" />
          <ul className="mt-4 divide-y divide-menny-cream/20">
            {archive.map((event) => (
              <li key={event.id} className="py-3 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="display text-xl">{event.title}</p>
                  <p className="mono text-xs text-menny-cream/60">{formatDate(event.date)}</p>
                </div>
                <span className="chip text-menny-cream/50 border-menny-cream/30">{event.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const days = ['vas', 'hét', 'kedd', 'sze', 'csüt', 'pén', 'szo']
  const months = ['jan', 'feb', 'már', 'ápr', 'máj', 'jún', 'júl', 'aug', 'szep', 'okt', 'nov', 'dec']
  const day = days[date.getDay()]
  const month = months[date.getMonth()]
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${date.getFullYear()}. ${month} ${date.getDate()}. (${day}) ${hours}:${minutes}`
}
