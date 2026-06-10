import { Asterisk } from '../ui/Asterisk'

const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => i)

export function InstaWall() {
  return (
    <section className="px-4 md:px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="mono text-sm text-menny-yellow uppercase tracking-widest">
              @mennybudapest
            </p>
            <h2 className="display text-4xl md:text-6xl">Insta fal</h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="chip text-menny-yellow border-menny-yellow"
          >
            Követ &rarr;
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {PLACEHOLDERS.map((i) => (
            <div
              key={i}
              className="aspect-square border-2 border-menny-black grain relative"
              style={{
                background: i % 2 === 0
                  ? 'linear-gradient(135deg, var(--color-menny-red), var(--color-menny-yellow))'
                  : 'linear-gradient(135deg, var(--color-menny-yellow), var(--color-menny-cream))',
                transform: i % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
              }}
            >
              <Asterisk className="absolute inset-4 w-2/3 h-2/3 m-auto text-menny-black/30" />
            </div>
          ))}
        </div>

        <p className="mono text-xs text-menny-cream/50 mt-3">
          * Hamarosan: élő Instagram feed.
        </p>
      </div>
    </section>
  )
}
