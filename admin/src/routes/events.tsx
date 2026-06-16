import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { api } from '@/lib/api'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

interface Event {
  id: string
  title: string
  date: string
  category: string
  description: string | null
  imageUrl: string | null
}

const CATEGORIES = ['Concert', 'Jazz', 'Dance', 'Film Club', 'Quiz', 'Other']

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const load = () => api.get<Event[]>('/events').then(setEvents).catch(() => {})

  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setDialogOpen(true) }
  const openEdit = (e: Event) => { setEditing(e); setDialogOpen(true) }

  const handleDelete = async (id: string) => {
    await api.del(`/events/${id}`)
    setDeleteConfirm(null)
    load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button onClick={openCreate}><Plus className="w-4 h-4" /> New event</Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-3 font-medium">Title</th>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-left p-3 font-medium">Category</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-secondary/50">
                <td className="p-3 font-medium">{event.title}</td>
                <td className="p-3 text-muted-foreground">{new Date(event.date).toLocaleString()}</td>
                <td className="p-3"><Badge variant="secondary">{event.category}</Badge></td>
                <td className="p-3 text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(event)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(event.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No events yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <EventDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        event={editing}
        onSaved={load}
      />

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm deletion</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete this event?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EventDialog({ open, onClose, event, onSaved }: {
  open: boolean
  onClose: () => void
  event: Event | null
  onSaved: () => void
}) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('Concert')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setDate(event.date.slice(0, 16))
      setCategory(event.category)
      setDescription(event.description ?? '')
    } else {
      setTitle('')
      setDate('')
      setCategory('Concert')
      setDescription('')
    }
  }, [event, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = { title, date: new Date(date).toISOString(), category, description: description || undefined }
      if (event) {
        await api.put(`/events/${event.id}`, body)
      } else {
        await api.post('/events', body)
      }
      onSaved()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event ? 'Edit event' : 'New event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Date</label>
            <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Category</label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{event ? 'Save' : 'Create'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
