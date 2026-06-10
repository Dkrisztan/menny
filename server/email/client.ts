import { Resend } from 'resend'
import { render } from '@react-email/components'
import { env } from '../env.ts'
import { ContactFormEmail } from './templates/contact-form.tsx'
import { BookingRequestEmail } from './templates/booking-request.tsx'

const resend = new Resend(env.RESEND_API_KEY)

interface ContactData {
  type: string
  name: string
  email: string
  message: string
  metadata?: Record<string, unknown>
}

export async function sendContactEmail(data: ContactData) {
  const html = await render(ContactFormEmail({ data }))

  await resend.emails.send({
    from: env.RESEND_FROM,
    to: 'hello@menny.hu',
    subject: `Új üzenet: ${data.type} — ${data.name}`,
    html,
    replyTo: data.email,
  })
}

export async function sendBookingEmail(data: ContactData) {
  const html = await render(BookingRequestEmail({ data }))

  await resend.emails.send({
    from: env.RESEND_FROM,
    to: 'hello@menny.hu',
    subject: `Privát esemény ajánlatkérés — ${data.name}`,
    html,
    replyTo: data.email,
  })
}
