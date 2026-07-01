import { useEffect, useState } from 'react'
import { Asterisk } from '../ui/Asterisk'
import { strapiGet } from '../../lib/strapi'

interface ScheduleDay {
  id: string
  day: string
  event: string
  time: string | null
  order: number
}

const ROTATIONS = ['-2deg', '1deg', '-1deg', '2deg', '-1.5deg', '1.5deg', '-2deg']
const BGS = ['bg-menny-cream', 'bg-menny-yellow', 'bg-menny-cream', 'bg-menny-yellow', 'bg-menny-cream', 'bg-menny-yellow', 'bg-menny-black']

export function WeeklySchedule() {
  const [days, setDays] = useState<ScheduleDay[]>([])

  useEffect(() => {
    strapiGet<any>('/api/schedule-days?sort=order:asc')
      .then((data) => {
        setDays(data.map((item: any) => ({
          id: String(item.id),
          day: item.day,
          event: item.event,
          time: item.time ?? null,
          order: item.order,
        })))
      })
      .catch(() => {})
  }, [])

  return (
    <section className="px-4 md:px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="mono text-sm text-menny-yellow uppercase tracking-widest">Heti menü</p>
              <h2 className="display text-5xl md:text-7xl text-menny-cream">
                Mit csinálunk a héten<span className="text-menny-red">*</span>
              </h2>
            </div>
            <Asterisk className="hidden md:block w-16 h-16 text-menny-yellow" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {days.map((item, i) => {
              const isSunday = item.order === 7
              return (
                <div
                  key={item.id}
                  className={`weekly-card p-4 border-2 border-menny-black grain relative ${BGS[i % BGS.length]} ${isSunday ? 'text-menny-cream/60' : 'text-menny-black'}`}
                  style={{
                    transform: `rotate(${ROTATIONS[i % ROTATIONS.length]})`,
                    boxShadow: isSunday
                      ? '4px 4px 0 0 var(--color-menny-yellow)'
                      : '4px 4px 0 0 var(--color-menny-red)',
                  }}
                >
                  <p className="mono text-xs uppercase opacity-70">{item.day}</p>
                  <p className="display text-2xl mt-1 leading-none">{item.event}</p>
                  {item.time && (
                    <p className="mono text-xs mt-2 font-bold">{item.time}</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </section>
  )
}
