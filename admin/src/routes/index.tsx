import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'

export const Route = createFileRoute('/')({
  component: DashboardPage,
})

interface AnalyticsSummary {
  totals: { totalViews: number; uniqueSessions: number }
  topPages: { path: string; views: number }[]
  dailyViews: { date: string; views: number }[]
}

function DashboardPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [eventCount, setEventCount] = useState(0)
  const [contactCount, setContactCount] = useState(0)

  useEffect(() => {
    api.get<AnalyticsSummary>('/analytics/summary?days=30').then(setData).catch(() => {})
    api.get<unknown[]>('/events').then((e) => setEventCount(e.length)).catch(() => {})
    api.get<unknown[]>('/contact').then((c) => setContactCount(c.length)).catch(() => {})
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Page views (30d)" value={data?.totals.totalViews ?? '—'} />
        <StatCard title="Unique visitors" value={data?.totals.uniqueSessions ?? '—'} />
        <StatCard title="Events" value={eventCount} />
        <StatCard title="Messages" value={contactCount} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily page views</CardTitle>
        </CardHeader>
        <CardContent>
          {data && data.dailyViews.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.dailyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="currentColor" />
                <YAxis tick={{ fontSize: 12 }} stroke="currentColor" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Area type="monotone" dataKey="views" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No page view data yet.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top pages</CardTitle>
        </CardHeader>
        <CardContent>
          {data && data.topPages.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.topPages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="currentColor" />
                <YAxis dataKey="path" type="category" tick={{ fontSize: 12 }} width={120} stroke="currentColor" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Bar dataKey="views" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              No page data yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
