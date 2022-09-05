interface ChevronProps {
  direction: 'up' | 'down'
  className?: string
}

export default function Chevron({ direction, className }: ChevronProps) {
  return (
    <svg
      data-testid={direction}
      className={className}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      {direction === 'up' ? (
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 15l7-7 7 7'></path>
      ) : (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='3'
          d='M19 9l-7 7-7-7'
        ></path>
      )}
    </svg>
  )
}
