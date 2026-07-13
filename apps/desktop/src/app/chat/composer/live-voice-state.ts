import type { ConversationStatus } from './hooks/use-voice-conversation'

export type LiveVoiceOrbState = 'connecting' | 'listening' | 'thinking' | 'speaking' | 'disabled'
export type LiveVoiceLabelKey = 'connecting' | 'listening' | 'thinking' | 'speaking' | 'muted'

export interface LiveVoicePresentation {
  labelKey: LiveVoiceLabelKey
  orbState: LiveVoiceOrbState
}

export function liveVoicePresentation(status: ConversationStatus, muted: boolean): LiveVoicePresentation {
  if (muted) {
    return { labelKey: 'muted', orbState: 'disabled' }
  }

  switch (status) {
    case 'listening':
      return { labelKey: 'listening', orbState: 'listening' }

    case 'speaking':
      return { labelKey: 'speaking', orbState: 'speaking' }

    case 'transcribing':

    case 'thinking':
      return { labelKey: 'thinking', orbState: 'thinking' }

    default:
      return { labelKey: 'connecting', orbState: 'connecting' }
  }
}
