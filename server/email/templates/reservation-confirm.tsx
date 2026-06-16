import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

interface ReservationConfirmEmailProps {
  name: string
  partySize: number
  reservedFor: string
  confirmUrl: string
}

export function ReservationConfirmEmail({ name, partySize, reservedFor, confirmUrl }: ReservationConfirmEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Confirm your reservation</Heading>
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Please confirm your reservation for {partySize} {partySize === 1 ? 'person' : 'people'} on{' '}
              {new Date(reservedFor).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}.
            </Text>
            <Link href={confirmUrl} style={button}>
              Confirm Reservation
            </Link>
            <Text style={footnote}>
              If you did not make this reservation, you can safely ignore this email.
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
const button = {
  display: 'inline-block',
  backgroundColor: '#e8b828',
  color: '#1a1410',
  padding: '12px 24px',
  borderRadius: '4px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  marginTop: '16px',
  marginBottom: '16px',
}
const footnote = { color: '#a89580', fontSize: '12px', marginTop: '24px' }
