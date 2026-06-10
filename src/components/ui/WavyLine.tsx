interface WavyLineProps {
  className?: string
}

export function WavyLine({ className = 'w-full h-3 text-menny-yellow' }: WavyLineProps) {
  return (
    <svg
      viewBox="0 0 600 14"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 8 C 60 4, 120 11, 180 7 S 300 3, 360 8 S 480 11, 598 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 11 C 80 9, 160 13, 240 10 S 400 8, 596 11"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}
