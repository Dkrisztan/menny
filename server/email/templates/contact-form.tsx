import { Html, Head, Body, Container, Section, Heading, Text, Hr } from '@react-email/components'

interface ContactFormEmailProps {
  data: {
    type: string
    name: string
    email: string
    message: string
    metadata?: Record<string, unknown>
  }
}

export function ContactFormEmail({ data }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Új üzenet érkezett</Heading>
          <Section>
            <Text style={label}>Típus</Text>
            <Text style={value}>{data.type}</Text>
            <Text style={label}>Név</Text>
            <Text style={value}>{data.name}</Text>
            <Text style={label}>E-mail</Text>
            <Text style={value}>{data.email}</Text>
            <Text style={label}>Üzenet</Text>
            <Text style={value}>{data.message}</Text>
            {data.metadata && Object.keys(data.metadata).length > 0 && (
              <>
                <Hr />
                <Text style={label}>További adatok</Text>
                <Text style={value}>{JSON.stringify(data.metadata, null, 2)}</Text>
              </>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body = { backgroundColor: '#1a1410', fontFamily: 'sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const heading = { color: '#f2e6d0', fontSize: '24px' }
const label = { color: '#a89580', fontSize: '12px', textTransform: 'uppercase' as const, marginBottom: '0' }
const value = { color: '#f2e6d0', fontSize: '16px', marginTop: '4px' }
