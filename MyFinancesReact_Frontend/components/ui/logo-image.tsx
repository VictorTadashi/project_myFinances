'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LogoImageProps {
  variant?: 'auto' | 'white' | 'black'
  width?: number
  height?: number
  className?: string
}

export function LogoImage({ variant = 'auto', width = 140, height = 40, className }: LogoImageProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (variant === 'white') {
    return (
      <Image
        src="/images/logo_white.png"
        alt="MyFinances"
        width={width}
        height={height}
        className={className}
      />
    )
  }

  if (variant === 'black') {
    return (
      <Image
        src="/images/logo_black.png"
        alt="MyFinances"
        width={width}
        height={height}
        className={className}
      />
    )
  }

  if (!mounted) return <div style={{ width, height }} />

  const src = resolvedTheme === 'dark' ? '/images/logo_white.png' : '/images/logo_black.png'
  return (
    <Image
      src={src}
      alt="MyFinances"
      width={width}
      height={height}
      className={className}
    />
  )
}
