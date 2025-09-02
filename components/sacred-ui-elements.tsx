"use client"

import { useEffect, useState } from "react"

export function DiyaIcons() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <>
      <div className="diya-icon diya-top-left" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-400" role="img" aria-label="Diya">
          <path
            d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
            fill="currentColor"
            opacity="0.8"
          />
          <ellipse cx="12" cy="16" rx="6" ry="2" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="10" r="1" fill="#FFD700" />
        </svg>
      </div>
      <div className="diya-icon diya-top-right" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-400" role="img" aria-label="Diya">
          <path
            d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
            fill="currentColor"
            opacity="0.8"
          />
          <ellipse cx="12" cy="16" rx="6" ry="2" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="10" r="1" fill="#FFD700" />
        </svg>
      </div>
      <div className="diya-icon diya-bottom-left" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-400" role="img" aria-label="Diya">
          <path
            d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
            fill="currentColor"
            opacity="0.8"
          />
          <ellipse cx="12" cy="16" rx="6" ry="2" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="10" r="1" fill="#FFD700" />
        </svg>
      </div>
      <div className="diya-icon diya-bottom-right" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-400" role="img" aria-label="Diya">
          <path
            d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
            fill="currentColor"
            opacity="0.8"
          />
          <ellipse cx="12" cy="16" rx="6" ry="2" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="10" r="1" fill="#FFD700" />
        </svg>
      </div>
    </>
  )
}

export function MandalaSeparator() {
  return (
    <div className="sacred-separator" aria-hidden="true">
      <div className="sacred-separator-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" className="text-orange-400" role="img" aria-label="Mandala">
          <circle cx="16" cy="16" r="2" fill="currentColor" />
          <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <path
            d="M16 6 L16 10 M16 22 L16 26 M6 16 L10 16 M22 16 L26 16"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M11.5 11.5 L13.5 13.5 M18.5 18.5 L20.5 20.5 M20.5 11.5 L18.5 13.5 M13.5 18.5 L11.5 20.5"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  )
}

export function LotusPattern() {
  return <div className="absolute inset-0 lotus-pattern opacity-30 pointer-events-none" aria-hidden="true" />
}
