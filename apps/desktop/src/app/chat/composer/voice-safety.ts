const ENGLISH_SIDE_EFFECT =
  /\b(delete|remove|erase|wipe|deploy|publish|post|send|pay|purchase|buy|sell|trade|transfer|restart|reboot|stop|start|kill|liquidate|withdraw)\b/i

const VIETNAMESE_SIDE_EFFECT =
  /\b(xoa|gui|dang|trien khai|thanh toan|mua|ban|giao dich|chuyen|khoi dong lai|thanh ly|rut)\b/i

const VIETNAMESE_STOP_TARGET = /\b(dung|tat)\s+(bot|may|dich vu|service|server|ung dung|app)\b/i
const SIDE_EFFECT_SLASH_COMMAND = /^\s*\/(stop|restart|update|approve|deny)\b/i

function foldVietnamese(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, match => (match === 'Đ' ? 'D' : 'd'))
    .toLowerCase()
}

/**
 * Voice conversation normally submits hands-free. Potentially side-effectful
 * transcripts are deliberately conservative: they are returned to the draft
 * for review instead of being sent automatically.
 */
export function voiceTranscriptNeedsReview(transcript: string): boolean {
  const normalized = transcript.normalize('NFC').trim()

  if (!normalized) {
    return false
  }

  const folded = foldVietnamese(normalized)

  return (
    ENGLISH_SIDE_EFFECT.test(normalized) ||
    VIETNAMESE_SIDE_EFFECT.test(folded) ||
    VIETNAMESE_STOP_TARGET.test(folded) ||
    SIDE_EFFECT_SLASH_COMMAND.test(normalized)
  )
}
