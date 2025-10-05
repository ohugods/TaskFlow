import { describe, expect, it } from 'vitest'
import { formatDate, formatDateTime, getDaysUntilDue, isDueToday, isOverdue } from '../dateUtils'

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2023-12-25T00:00:00')
      expect(formatDate(date)).toBe('25/12/2023')
    })
  })

  describe('formatDateTime', () => {
    it('formats date and time correctly', () => {
      const date = new Date('2023-12-25T14:30:00')
      expect(formatDateTime(date)).toBe('25/12/2023, 14:30')
    })
  })

  describe('isOverdue', () => {
    it('returns true for past dates', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isOverdue(yesterday)).toBe(true)
    })

    it('returns false for future dates', () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      expect(isOverdue(tomorrow)).toBe(false)
    })

    it('returns false for today', () => {
      const today = new Date()
      expect(isOverdue(today)).toBe(false)
    })
  })

  describe('isDueToday', () => {
    it('returns true for today', () => {
      const today = new Date()
      expect(isDueToday(today)).toBe(true)
    })

    it('returns false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isDueToday(yesterday)).toBe(false)
    })

    it('returns false for tomorrow', () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      expect(isDueToday(tomorrow)).toBe(false)
    })
  })

  describe('getDaysUntilDue', () => {
    it('returns correct days for future dates', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 5)
      expect(getDaysUntilDue(futureDate)).toBe(5)
    })

    it('returns negative days for past dates', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 3)
      expect(getDaysUntilDue(pastDate)).toBe(-3)
    })

    it('returns 0 for today', () => {
      const today = new Date()
      expect(getDaysUntilDue(today)).toBe(0)
    })
  })
})
