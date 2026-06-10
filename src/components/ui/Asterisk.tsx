interface AsteriskProps {
  className?: string
}

export function Asterisk({ className = 'w-5 h-5' }: AsteriskProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M32 8 C 31 22, 30 28, 32 32 C 34 28, 33 22, 32 8 Z" fill="currentColor" />
      <path d="M32 56 C 33 42, 34 36, 32 32 C 30 36, 31 42, 32 56 Z" fill="currentColor" />
      <path d="M8 32 C 22 31, 28 30, 32 32 C 28 34, 22 33, 8 32 Z" fill="currentColor" />
      <path d="M56 32 C 42 33, 36 34, 32 32 C 36 30, 42 31, 56 32 Z" fill="currentColor" />
      <path d="M14 14 C 24 22, 28 26, 32 32 C 26 28, 22 24, 14 14 Z" fill="currentColor" />
      <path d="M50 50 C 40 42, 36 38, 32 32 C 38 36, 42 40, 50 50 Z" fill="currentColor" />
      <path d="M14 50 C 22 40, 26 36, 32 32 C 28 38, 24 42, 14 50 Z" fill="currentColor" />
      <path d="M50 14 C 42 22, 38 26, 32 32 C 36 26, 40 22, 50 14 Z" fill="currentColor" />
    </svg>
  )
}
