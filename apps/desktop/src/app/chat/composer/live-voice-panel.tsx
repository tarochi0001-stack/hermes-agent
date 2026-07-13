import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { iconSize, Square } from '@/lib/icons'
import { cn } from '@/lib/utils'

import type { ConversationStatus } from './hooks/use-voice-conversation'
import { LiveVoiceOrb } from './live-voice-orb'
import { liveVoicePresentation } from './live-voice-state'

interface LiveVoicePanelProps {
  active: boolean
  level: number
  muted: boolean
  status: ConversationStatus
  onEnd: () => void
  onStopTurn: () => void
  onToggleMute: () => void
}

export function LiveVoicePanel({ active, level, muted, onEnd, onStopTurn, onToggleMute, status }: LiveVoicePanelProps) {
  const { t } = useI18n()

  if (!active) {
    return null
  }

  const c = t.composer
  const presentation = liveVoicePresentation(status, muted)

  const label =
    presentation.labelKey === 'speaking'
      ? c.speaking
      : presentation.labelKey === 'thinking'
        ? c.thinking
        : presentation.labelKey === 'muted'
          ? c.muted
          : presentation.labelKey === 'listening'
            ? c.listening
            : c.starting

  return (
    <section
      aria-label={c.voiceConversation}
      className={cn(
        'pointer-events-auto absolute inset-x-0 bottom-[calc(100%+0.75rem)] mx-auto w-[min(36rem,calc(100vw-3rem))] overflow-hidden rounded-[1.75rem] border border-border/55',
        'bg-[color-mix(in_srgb,var(--background)_88%,transparent)] shadow-[0_28px_90px_-32px_rgb(3_18_30/0.55)] backdrop-blur-2xl'
      )}
      data-testid="live-voice-panel"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_55%)]" />
      <div className="relative flex flex-col items-center px-6 pb-5 pt-4">
        <div className="flex w-full items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span>{c.voiceConversation}</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgb(52_211_153/0.8)]" />
            {c.localVoice}
          </span>
        </div>

        <LiveVoiceOrb className="my-1" level={level} state={presentation.orbState} />

        <div aria-live="polite" className="text-center" role="status">
          <div className="text-base font-semibold tracking-tight text-foreground">{label}</div>
          <p className="mt-1 text-xs text-muted-foreground">{c.liveVoiceHint}</p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button
            aria-label={muted ? c.unmuteMic : c.muteMic}
            className="h-9 rounded-full px-4 text-xs"
            onClick={onToggleMute}
            type="button"
            variant="outline"
          >
            {muted ? c.unmuteMic : c.muteMic}
          </Button>
          {status === 'listening' && !muted && (
            <Button
              className="h-9 gap-1.5 rounded-full px-4 text-xs"
              onClick={onStopTurn}
              type="button"
              variant="outline"
            >
              <Square className={cn('fill-current', iconSize.xs)} />
              {c.stopShort}
            </Button>
          )}
          <Button className="h-9 rounded-full px-5 text-xs" onClick={onEnd} type="button">
            {c.endConversation}
          </Button>
        </div>
      </div>
    </section>
  )
}
