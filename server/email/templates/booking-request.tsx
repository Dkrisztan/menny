import { Html, Head, Body, Container, Section, Heading, Text, Hr } from '@react-email/components'

interface BookingRequestEmailProps {
  data: {
    name: string
    email: string
    message: string
    metadata?: Record<string, unknown>
  }
}

export function BookingRequestEmail({ data }: BookingRequestEmailProps) {
  const meta = data.metadata ?? {}

  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Privát esemény ajánlatkérés</Heading>
          <Section>
            <Text style={label}>Név</Text>
            <Text style={value}>{data.name}</Text>
            <Text style={label}>E-mail</Text>
            <Text style={value}>{data.email}</Text>
            {meta.occasion != null && (
              <>
                <Text style={label}>Alkalom</Text>
                <Text style={value}>{`${meta.occasion}`}</Text>
              </>
            )}
            {meta.date != null && (
              <>
                <Text style={label}>Dátum</Text>
                <Text style={value}>{`${meta.date}`}</Text>
              </>
            )}
            {meta.guests != null && (
              <>
                <Text style={label}>Létszám</Text>
                <Text style={value}>{`${meta.guests}`} fő</Text>
              </>
            )}
            <Hr />
            <Text style={label}>Üzenet / egyéb</Text>
            <Text style={value}>{data.message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body = { backgroundColor: '#1a1410', fontFamily: 'sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const heading = { color: '#e8b828', fontSize: '24px' }
const label = { color: '#a89580', fontSize: '12px', textTransform: 'uppercase' as const, marginBottom: '0' }
const value = { color: '#f2e6d0', fontSize: '16px', marginTop: '4px' }
