import nodemailer from 'nodemailer'
import { render } from '@react-email/components'
import { env } from '../env.ts'
import { ContactFormEmail } from './templates/contact-form.tsx'
import { BookingRequestEmail } from './templates/booking-request.tsx'
import { ReservationConfirmEmail } from './templates/reservation-confirm.tsx'
import { ReservationAcceptedEmail } from './templates/reservation-accepted.tsx'
import { ReservationDeclinedEmail } from './templates/reservation-declined.tsx'

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
})

interface ContactData {
  type: string
  name: string
  email: string
  message: string
  metadata?: Record<string, unknown>
}

export async function sendContactEmail(data: ContactData) {
  const html = await render(ContactFormEmail({ data }))

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: 'hello@menny.hu',
    subject: `New message: ${data.type} — ${data.name}`,
    html,
    replyTo: data.email,
  })
}

export async function sendBookingEmail(data: ContactData) {
  const html = await render(BookingRequestEmail({ data }))

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: 'hello@menny.hu',
    subject: `Private event request — ${data.name}`,
    html,
    replyTo: data.email,
  })
}

interface ReservationConfirmData {
  name: string
  email: string
  partySize: number
  reservedFor: string
  confirmUrl: string
}

export async function sendReservationConfirmEmail(data: ReservationConfirmData) {
  const html = await render(ReservationConfirmEmail({
    name: data.name,
    partySize: data.partySize,
    reservedFor: data.reservedFor,
    confirmUrl: data.confirmUrl,
  }))

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: data.email,
    subject: 'Confirm your reservation — Menny*',
    html,
  })
}

interface ReservationStatusData {
  name: string
  email: string
  partySize: number
  reservedFor: string
  reason?: string
}

export async function sendReservationAcceptedEmail(data: ReservationStatusData) {
  const html = await render(ReservationAcceptedEmail({
    name: data.name,
    partySize: data.partySize,
    reservedFor: data.reservedFor,
  }))

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: data.email,
    subject: 'Your reservation is confirmed — Menny*',
    html,
  })
}

export async function sendReservationDeclinedEmail(data: ReservationStatusData) {
  const html = await render(ReservationDeclinedEmail({
    name: data.name,
    partySize: data.partySize,
    reservedFor: data.reservedFor,
    reason: data.reason,
  }))

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: data.email,
    subject: 'Reservation update — Menny*',
    html,
  })
}
