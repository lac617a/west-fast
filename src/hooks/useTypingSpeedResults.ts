import useTypingStore from '@/stores/useTyping'
import { CALC_MINUTES } from '@/constants'

export function useTypingSpeedResults() {
  const { options, words } = useTypingStore()
  const setTimer = useTypingStore(state => state.setTimer)
  const setWordsLength = useTypingStore(state => state.setWordsLength)

  const totalWordsTyped = words.length
  const totalCharsTyped = words.correct + words.incorrect
  const timeUsedByUser = CALC_MINUTES - options.currentTimer

  const calculateCharsScore = (): number => {
    if (options.status !== 'finished') return 0
    if (options.currentTimer >= 1) {
      const charsPerSecond = totalCharsTyped / timeUsedByUser
      const finalScore = charsPerSecond * CALC_MINUTES
      return Math.round(finalScore)
    }
    const finalScore = totalCharsTyped
    return finalScore
  }

  const calculateWordsScore = (): number => {
    if (options.status !== 'finished') return 0
    if (options.currentTimer >= 1) {
      const wordPerSecond = totalWordsTyped / timeUsedByUser
      const finalScore = wordPerSecond * CALC_MINUTES
      return Math.round(finalScore)
    }
    const finalScore = totalWordsTyped * 2
    return finalScore
  }

  const calculateAccurancyScore = (): string => {
    const noneResults = '0'
    if (options.status !== 'finished') return noneResults
    const calc = words.correct / (words.correct + words.incorrect)
    return words.correct !== 0 ? `${Math.round(calc * 100)}` : noneResults
  }

  return {
    words,
    options,
    setWordsLength,
    setTimer,
    calculateWordsScore,
    calculateCharsScore,
    calculateAccurancyScore
  }
}
