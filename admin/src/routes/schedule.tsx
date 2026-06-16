import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { api } from '@/lib/api'

export const Route = createFileRoute('/schedule')({
  component: SchedulePage,
})

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

interface ScheduleItem {
  dayOfWeek: number
  eventName: string
  time: string | null
}

function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(
    DAY_NAMES.map((_, i) => ({ dayOfWeek: i, eventName: '', time: null })),
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get<ScheduleItem[]>('/schedule').then((items) => {
      if (items.length > 0) {
        const merged = DAY_NAMES.map((_, i) => {
          const existing = items.find((item) => item.dayOfWeek === i)
          return existing ?? { dayOfWeek: i, eventName: '', time: null }
        })
        setSchedule(merged)
      }
    }).catch(() => {})
  }, [])

  const updateDay = (index: number, field: 'eventName' | 'time', value: string) => {
    setSchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value || (field === 'time' ? null : '') } : item,
      ),
    )
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = schedule.filter((item) => item.eventName.trim() !== '')
      await api.put('/schedule', payload)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Weekly Schedule</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </Button>
      </div>

      <div className="grid gap-3">
        {schedule.map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm font-semibold shrink-0">{DAY_NAMES[i]}</span>
                <Input
                  placeholder="Event name (e.g. Jazz Wednesday)"
                  value={item.eventName}
                  onChange={(e) => updateDay(i, 'eventName', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="time"
                  placeholder="Time"
                  value={item.time ?? ''}
                  onChange={(e) => updateDay(i, 'time', e.target.value)}
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
