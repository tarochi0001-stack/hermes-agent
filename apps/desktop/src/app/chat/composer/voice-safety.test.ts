import { describe, expect, it } from 'vitest'

import { voiceTranscriptNeedsReview } from './voice-safety'

describe('voiceTranscriptNeedsReview', () => {
  it.each([
    'Delete the old deployment',
    'restart bot 3392',
    'buy 0.1 SOL of this token',
    'Đăng bài này lên X',
    'dừng bot 3396 nhé',
    'thanh lý toàn bộ vị thế',
    '/restart'
  ])('holds side-effectful transcript for review: %s', transcript => {
    expect(voiceTranscriptNeedsReview(transcript)).toBe(true)
  })

  it.each([
    'Phân tích bài X này có đúng không?',
    'Tóm tắt nội dung cuộc họp',
    'Explain why the service restarted yesterday',
    'What does liquidation mean?'
  ])('allows ordinary conversation to auto-submit: %s', transcript => {
    expect(voiceTranscriptNeedsReview(transcript)).toBe(false)
  })
})
