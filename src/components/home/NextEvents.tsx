import { Link } from '@tanstack/react-router'

export function NextEvents() {
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
          {/* Event cards will be populated with real data later */}
        </div>
      </div>
    </section>
  )
}
