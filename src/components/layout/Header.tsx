import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import { Asterisk } from '../ui/Asterisk'

const NAV_LINKS = [
  { to: '/programok', label: 'Programok' },
  { to: '/a-hely', label: 'A hely' },
  { to: '/szervezz', label: 'Szervezz' },
  { to: '/privat', label: 'Privát' },
  { to: '/kapcsolat', label: 'Kapcsolat' },
] as const

export function Header() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b-2 border-menny-black/60 backdrop-blur-md bg-menny-black/85">
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center">
          <span className="inline-flex items-baseline gap-1 display text-2xl">
            <span>Menny</span>
            <Asterisk className="w-5 h-5 -translate-y-[0.15em] text-menny-red" />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-2 display text-lg tracking-wide transition-colors ${
                currentPath === to
                  ? 'text-menny-yellow'
                  : 'text-menny-cream hover:text-menny-yellow'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Menü"
          className="md:hidden p-2 text-menny-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-menny-black/60 bg-menny-black/95 px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-2 display text-lg tracking-wide ${
                currentPath === to ? 'text-menny-yellow' : 'text-menny-cream'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
