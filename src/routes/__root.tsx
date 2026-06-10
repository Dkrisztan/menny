import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { trackPageView } from '../lib/analytics'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current !== pathname) {
      trackPageView(pathname)
      prevPath.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    trackPageView(pathname)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
