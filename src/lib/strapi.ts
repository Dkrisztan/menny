const STRAPI_URL = import.meta.env.VITE_STRAPI_URL

export async function strapiGet<T>(path: string): Promise<T[]> {
  const res = await fetch(`${STRAPI_URL}${path}`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data.map((item: any) => ({ id: item.id, ...item.attributes }))
}

export async function strapiPost(path: string, data: Record<string, unknown>): Promise<Response> {
  return fetch(`${STRAPI_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  })
}

export function strapiMedia(url: string | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}
