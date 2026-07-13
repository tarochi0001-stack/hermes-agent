import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

import styles from './live-voice-orb.module.css'
import type { LiveVoiceOrbState } from './live-voice-state'

export function LiveVoiceOrb({
  className,
  level,
  state
}: {
  className?: string
  level: number
  state: LiveVoiceOrbState
}) {
  const normalized = Math.max(0, Math.min(level, 1))

  return (
    <div
      aria-hidden="true"
      className={cn(styles.orb, className)}
      data-state={state}
      style={{ '--orb-level': normalized } as CSSProperties}
    >
      <span className={styles.glow} />
      <span className={styles.ring} />
      <span className={cn(styles.ring, styles.ring2)} />
      <span className={cn(styles.ring, styles.ring3)} />
      <span className={styles.arc} />
      <span className={styles.core} />
    </div>
  )
}
