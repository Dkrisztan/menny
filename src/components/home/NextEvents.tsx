import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { apiFetch } from '../../lib/strapi'

interface Event {
  id: string
  title: string
  date: string
  category: string
}

export function NextEvents() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    apiFetch<Event[]>('/api/events')
      .then((data) => {
        const now = new Date()
        const upcoming = data
          .filter((e) => new Date(e.date) >= now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3)
        setEvents(upcoming)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="px-4 md:px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="mono text-sm text-menny-yellow uppercase tracking-widest mb-2">
              Plakátfal
            </p>
            <h2 className="display text-5xl md:text-7xl leading-none">
              Következő<span className="text-menny-red">*</span> esték
            </h2>
          </div>
          <Link
            to="/programok"
            className="hidden md:inline-flex chip text-menny-yellow border-menny-yellow"
          >
            Mind &rarr;
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {events.map((event, i) => (
            <div
              key={event.id}
              className="poster-card p-5 grain relative"
              style={{ transform: `rotate(${i % 2 === 0 ? '-1.5deg' : '1.5deg'})` }}
            >
              <p className="mono text-xs uppercase opacity-70">{event.category}</p>
              <p className="display text-2xl mt-1">{event.title}</p>
              <p className="mono text-xs mt-2">{formatDate(event.date)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const days = ['vas', 'hét', 'kedd', 'sze', 'csüt', 'pén', 'szo']
  const months = ['jan', 'feb', 'már', 'ápr', 'máj', 'jún', 'júl', 'aug', 'szep', 'okt', 'nov', 'dec']
  return `${date.getFullYear()}. ${months[date.getMonth()]} ${date.getDate()}. (${days[date.getDay()]}) ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}
