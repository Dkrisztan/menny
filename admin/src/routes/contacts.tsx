import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { api } from '@/lib/api'

export const Route = createFileRoute('/contacts')({
  component: ContactsPage,
})

interface Submission {
  id: string
  type: 'contact' | 'szervezz' | 'privat'
  name: string
  email: string
  message: string
  metadata: Record<string, unknown> | null
  createdAt: string
}

const TYPE_LABELS: Record<string, string> = {
  contact: 'Contact',
  szervezz: 'Booking',
  privat: 'Private',
}

function ContactsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const load = () => api.get<Submission[]>('/contact').then(setSubmissions).catch(() => {})

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    await api.del(`/contact/${id}`)
    setDeleteConfirm(null)
    load()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages</h2>

      <div className="space-y-2">
        {submissions.map((sub) => (
          <div key={sub.id} className="border border-border rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-4 hover:bg-secondary/50 cursor-pointer"
              onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline">{TYPE_LABELS[sub.type] ?? sub.type}</Badge>
                <span className="font-medium">{sub.name}</span>
                <span className="text-muted-foreground text-sm">{sub.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(sub.createdAt).toLocaleString()}
                </span>
                {expanded === sub.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
            {expanded === sub.id && (
              <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
                <p className="text-sm whitespace-pre-wrap">{sub.message}</p>
                {sub.metadata && Object.keys(sub.metadata).length > 0 && (
                  <div className="text-xs text-muted-foreground font-mono bg-secondary p-2 rounded">
                    {Object.entries(sub.metadata).map(([k, v]) => (
                      <div key={k}><strong>{k}:</strong> {String(v)}</div>
                    ))}
                  </div>
                )}
                <Button variant="destructive" size="sm" onClick={() => setDeleteConfirm(sub.id)}>
                  <Trash2 className="w-3 h-3 mr-1" /> Delete
                </Button>
              </div>
            )}
          </div>
        ))}
        {submissions.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No messages received yet.</p>
        )}
      </div>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm deletion</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete this message?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
