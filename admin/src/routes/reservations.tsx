import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ChevronRight, Users, CalendarDays, Check, X } from 'lucide-react'
import { api } from '@/lib/api'
import { ButtonGroup } from '@/components/ui/button-group'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

export const Route = createFileRoute('/reservations')({
  component: ReservationsPage,
})

interface Reservation {
  id: string
  name: string
  email: string
  partySize: number
  description: string | null
  reservedFor: string
  status: string
  confirmed: boolean
  createdAt: string
}

function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Reservation | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [view, setView] = useState<'pending' | 'responded'>('pending')

  const fetchReservations = async () => {
    try {
      const data = await api.get<Reservation[]>('/reservations')
      setReservations(data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReservations() }, [])

  const pending = reservations.filter((r) => r.status === 'pending')
  const responded = reservations.filter((r) => r.status !== 'pending')

  const openDetail = (r: Reservation) => {
    setSelected(r)
    setSheetOpen(true)
  }

  const handleStatusChange = async () => {
    await fetchReservations()
    setSheetOpen(false)
    setSelected(null)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Reservations</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Reservations</h2>

      <ButtonGroup>
        <Button
          size="sm"
          variant={view === 'pending' ? 'default' : 'outline'}
          onClick={() => setView('pending')}
        >
          Pending {pending.length > 0 && <Badge className="ml-1.5 bg-primary-foreground/20 text-primary-foreground text-xs">{pending.length}</Badge>}
        </Button>
        <Button
          size="sm"
          variant={view === 'responded' ? 'default' : 'outline'}
          onClick={() => setView('responded')}
        >
          Responded
        </Button>
      </ButtonGroup>

      {view === 'pending' && (
        pending.length === 0 ? (
          <EmptyState message="No pending reservations" />
        ) : (
          <ReservationList items={pending} onSelect={openDetail} />
        )
      )}

      {view === 'responded' && (
        responded.length === 0 ? (
          <EmptyState message="No responded reservations yet" />
        ) : (
          <ReservationList items={responded} onSelect={openDetail} />
        )
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="overflow-y-auto">
          {selected && (
            <ReservationDetail
              reservation={selected}
              onStatusChange={handleStatusChange}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function ReservationList({ items, onSelect }: { items: Reservation[]; onSelect: (r: Reservation) => void }) {
  return (
    <div className="space-y-2 mt-4">
      {items.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r)}
          className="w-full flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-left"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{r.name}</span>
              <StatusBadge status={r.status} />
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {r.partySize}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                {formatDate(r.reservedFor)}
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
        </button>
      ))}
    </div>
  )
}

function ReservationDetail({ reservation, onStatusChange }: { reservation: Reservation; onStatusChange: () => void }) {
  const [declining, setDeclining] = useState(false)
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleAccept = async () => {
    setSubmitting(true)
    await api.patch(`/reservations/${reservation.id}`, { status: 'accepted' })
    setSubmitting(false)
    onStatusChange()
  }

  const handleDecline = async () => {
    setSubmitting(true)
    await api.patch(`/reservations/${reservation.id}`, {
      status: 'declined',
      ...(reason.trim() && { reason: reason.trim() }),
    })
    setSubmitting(false)
    onStatusChange()
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>{reservation.name}</SheetTitle>
        <SheetDescription>{reservation.email}</SheetDescription>
      </SheetHeader>

      <div className="mt-6 space-y-4">
        <DetailRow label="Party size" value={`${reservation.partySize} ${reservation.partySize === 1 ? 'person' : 'people'}`} />
        <DetailRow label="Date" value={formatDateLong(reservation.reservedFor)} />
        {reservation.description && (
          <DetailRow label="Note" value={reservation.description} />
        )}
        <DetailRow label="Submitted" value={formatDateLong(reservation.createdAt)} />
        <DetailRow label="Status" value={<StatusBadge status={reservation.status} />} />
      </div>

      {reservation.status === 'pending' && (
        <div className="mt-8 space-y-3">
          <div className="h-px bg-border" />

          {!declining ? (
            <div className="flex gap-3">
              <Button
                className="flex-1 rounded-xl"
                onClick={handleAccept}
                disabled={submitting}
              >
                <Check className="w-4 h-4 mr-2" />
                Accept
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-xl"
                onClick={() => setDeclining(true)}
                disabled={submitting}
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Textarea
                placeholder="Reason for declining (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
              <div className="flex gap-3">
                <Button
                  variant="destructive"
                  className="flex-1 rounded-xl"
                  onClick={handleDecline}
                  disabled={submitting}
                >
                  Confirm Decline
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-xl"
                  onClick={() => { setDeclining(false); setReason('') }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    accepted: 'bg-green-500/15 text-green-400 border-green-500/30',
    declined: 'bg-red-500/15 text-red-400 border-red-500/30',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variants[status] ?? ''}`}>
      {status}
    </span>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-16 text-muted-foreground">
      {message}
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatDateLong(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
