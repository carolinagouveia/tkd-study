interface ProgressRingProps {
  value: number  // 0–100
  size?: number  // px
  strokeWidth?: number
  className?: string
}

export function ProgressRing({
  value,
  size = 48,
  strokeWidth = 4,
  className = '',
}: ProgressRingProps) {
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-label={`${value}% completo`}
      role="img"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-gray-200 dark:text-gray-700"
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="text-accent-500 transition-[stroke-dashoffset] duration-500"
      />
    </svg>
  )
}
