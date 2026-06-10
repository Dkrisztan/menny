export function trackPageView(path: string) {
  if (typeof navigator === 'undefined' || !navigator.sendBeacon) return

  const payload = JSON.stringify({
    path,
    referrer: document.referrer || undefined,
    screenWidth: window.innerWidth,
  })

  navigator.sendBeacon('/api/analytics/track', payload)
}
