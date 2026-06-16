import { createRootRoute, Outlet, Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import { CalendarCheck, Calendar, Image, Mail, LayoutDashboard, LogOut, FileText, Clock, Settings } from 'lucide-react'
import { authClient } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Route = createRootRoute({
  component: RootLayout,
})

const MAIN_NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/reservations', label: 'Reservations', icon: CalendarCheck },
] as const

const CONTENT_NAV = [
  { to: '/content', label: 'Content', icon: FileText },
  { to: '/events', label: 'Events', icon: Calendar },
  { to: '/gallery', label: 'Gallery', icon: Image },
  { to: '/contacts', label: 'Messages', icon: Mail },
  { to: '/schedule', label: 'Schedule', icon: Clock },
] as const

function RootLayout() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!session) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-sm font-semibold text-muted-foreground">Menny* Admin</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{session.user.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => authClient.signOut()}
            >
              <LogOut className="w-4 h-4 mr-1" /> Sign out
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: authError } = await authClient.signIn.email({ email, password })
    if (authError) {
      setError(authError.message ?? 'Invalid credentials')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Menny* Admin</h1>
        <p className="text-sm text-muted-foreground text-center">Sign in with your admin account.</p>
        <form onSubmit={handleLogin} className="space-y-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}

function NavItem({ to, label, icon: Icon, pathname }: { to: string; label: string; icon: React.ComponentType<{ className?: string }>; pathname: string }) {
  const active = to === '/' ? pathname === '/' : pathname.startsWith(to)
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        active
          ? 'bg-sidebar-accent text-accent'
          : 'text-sidebar-foreground hover:bg-sidebar-accent'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  )
}

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <aside className="w-60 border-r border-border bg-sidebar flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-border">
        <span className="font-bold text-lg">Menny*</span>
      </div>
      <nav className="flex-1 p-2 flex flex-col">
        <div className="space-y-1">
          {MAIN_NAV.map((item) => (
            <NavItem key={item.to} {...item} pathname={pathname} />
          ))}
        </div>
        <div className="my-3 h-px bg-border" />
        <div className="space-y-1">
          {CONTENT_NAV.map((item) => (
            <NavItem key={item.to} {...item} pathname={pathname} />
          ))}
        </div>
        <div className="mt-auto pt-3 border-t border-border">
          <NavItem to="/settings" label="Settings" icon={Settings} pathname={pathname} />
        </div>
      </nav>
    </aside>
  )
}
