import { describe, expect, it } from 'vitest'

import { liveVoicePresentation } from './live-voice-state'

describe('liveVoicePresentation', () => {
  it.each([
    ['idle', false, 'connecting'],
    ['listening', false, 'listening'],
    ['transcribing', false, 'thinking'],
    ['thinking', false, 'thinking'],
    ['speaking', false, 'speaking'],
    ['listening', true, 'disabled']
  ] as const)('maps %s muted=%s to orb state %s', (status, muted, orbState) => {
    expect(liveVoicePresentation(status, muted).orbState).toBe(orbState)
  })

  it('provides a concise user-facing phase key', () => {
    expect(liveVoicePresentation('listening', false).labelKey).toBe('listening')
    expect(liveVoicePresentation('speaking', false).labelKey).toBe('speaking')
    expect(liveVoicePresentation('listening', true).labelKey).toBe('muted')
  })
})
