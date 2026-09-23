// Inline stroke icons for the /course landing page — copied path-for-path from
// handoff/reference/course-page.html so the page matches the approved design.
// (lucide-react's flag / dollar / rotate glyphs differ from the reference.)

import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function base(strokeWidth: number, props: IconProps): IconProps {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
    ...props,
  }
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(2, props)}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base(2, props)}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function FlagIcon(props: IconProps) {
  return (
    <svg {...base(2, props)}>
      <path d="M4 22V4" />
      <path d="M4 4h14l-3 4 3 4H4" />
    </svg>
  )
}

export function PricingIcon(props: IconProps) {
  return (
    <svg {...base(1.8, props)}>
      <path d="M12 2v20" />
      <path d="M17 6.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2.2 2.6 5 3.2 5 1.3 5 3.3-2.2 3-5 3-5-1.1-5-3" />
    </svg>
  )
}

export function PitchingIcon(props: IconProps) {
  return (
    <svg {...base(1.8, props)}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  )
}

export function ContractsIcon(props: IconProps) {
  return (
    <svg {...base(1.8, props)}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  )
}

export function RenewalsIcon(props: IconProps) {
  return (
    <svg {...base(1.8, props)}>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 3v6h-6" />
    </svg>
  )
}
