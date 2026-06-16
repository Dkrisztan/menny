import { Html, Head, Body, Container, Section, Heading, Text } from '@react-email/components'

interface ReservationDeclinedEmailProps {
  name: string
  partySize: number
  reservedFor: string
  reason?: string
}

export function ReservationDeclinedEmail({ name, partySize, reservedFor, reason }: ReservationDeclinedEmailProps) {
  const date = new Date(reservedFor).toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Reservation Update</Heading>
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Unfortunately, we're unable to accommodate your reservation
              for {partySize} {partySize === 1 ? 'person' : 'people'} on {date}.
            </Text>
            {reason && (
              <Text style={reasonBox}>
                {reason}
              </Text>
            )}
            <Text style={text}>
              We apologize for the inconvenience. Feel free to try a different date or reach out
              to us if you have any questions.
            </Text>
            <Text style={text}>
              — The Menny* Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body = { backgroundColor: '#1a1410', fontFamily: 'sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const heading = { color: '#e8b828', fontSize: '24px' }
const text = { color: '#f2e6d0', fontSize: '16px', lineHeight: '1.6' }
const reasonBox = {
  color: '#f2e6d0',
  fontSize: '16px',
  lineHeight: '1.6',
  backgroundColor: '#2a2018',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #c0392b',
  fontStyle: 'italic' as const,
}
