import { Html, Head, Body, Container, Section, Heading, Text } from '@react-email/components'

interface ReservationAcceptedEmailProps {
  name: string
  partySize: number
  reservedFor: string
}

export function ReservationAcceptedEmail({ name, partySize, reservedFor }: ReservationAcceptedEmailProps) {
  const date = new Date(reservedFor).toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Reservation Confirmed!</Heading>
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Great news — your reservation has been accepted! We're looking forward to seeing you.
            </Text>
            <Text style={details}>
              Party size: {partySize} {partySize === 1 ? 'person' : 'people'}{'\n'}
              Date: {date}
            </Text>
            <Text style={text}>
              If you need to cancel or change anything, just reply to this email.
            </Text>
            <Text style={text}>
              See you soon!{'\n'}
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
const text = { color: '#f2e6d0', fontSize: '16px', lineHeight: '1.6', whiteSpace: 'pre-line' as const }
const details = {
  color: '#f2e6d0',
  fontSize: '16px',
  lineHeight: '1.8',
  backgroundColor: '#2a2018',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #e8b828',
  whiteSpace: 'pre-line' as const,
}
