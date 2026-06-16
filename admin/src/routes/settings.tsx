import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

interface VenueSettings {
  totalSeats: number
  totalTables: number
}

function SettingsPage() {
  const [settings, setSettings] = useState<VenueSettings>({ totalSeats: 0, totalTables: 0 })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get<VenueSettings>('/settings').then((data) => {
      setSettings(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const data = await api.patch<VenueSettings>('/settings', settings)
      setSettings(data)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Settings</h2>
        <div className="h-48 rounded-lg bg-muted animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>Venue Capacity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Total Seats</label>
            <Input
              type="number"
              min={0}
              value={settings.totalSeats}
              onChange={(e) => setSettings((s) => ({ ...s, totalSeats: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Total Tables</label>
            <Input
              type="number"
              min={0}
              value={settings.totalTables}
              onChange={(e) => setSettings((s) => ({ ...s, totalTables: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
            {saved && <span className="text-sm text-green-400">Saved!</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
