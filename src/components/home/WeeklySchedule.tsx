import { Asterisk } from '../ui/Asterisk'

const DAYS = [
  { day: 'Hétfő', event: 'Szabad foglalkozás', time: null, bg: 'bg-menny-cream', text: 'text-menny-black', rotate: '-2deg' },
  { day: 'Kedd', event: 'Szabad foglalkozás', time: null, bg: 'bg-menny-yellow', text: 'text-menny-black', rotate: '1deg' },
  { day: 'Szerda', event: 'Jazzszerda a Mennyben', time: '20:00', bg: 'bg-menny-cream', text: 'text-menny-black', rotate: '-1deg' },
  { day: 'Csütörtök', event: 'Mennybéli táncház', time: '20:00', bg: 'bg-menny-yellow', text: 'text-menny-black', rotate: '2deg' },
  { day: 'Péntek', event: 'Koncert est', time: '21:00', bg: 'bg-menny-cream', text: 'text-menny-black', rotate: '-1.5deg' },
  { day: 'Szombat', event: 'Pub quiz + koncert', time: '19:00', bg: 'bg-menny-yellow', text: 'text-menny-black', rotate: '1.5deg' },
  { day: 'Vasárnap', event: 'Zárva', time: null, bg: 'bg-menny-black', text: 'text-menny-cream/60', rotate: '-2deg', sunday: true },
]

export function WeeklySchedule() {
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
            {DAYS.map((item) => (
              <div
                key={item.day}
                className={`weekly-card p-4 border-2 border-menny-black grain relative ${item.bg} ${item.text}`}
                style={{
                  transform: `rotate(${item.rotate})`,
                  boxShadow: item.sunday
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
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
