import { create } from 'zustand'
import { generate } from 'random-words'

const TIMER_INIT = 20

type State = {
  words: {
    length: number
    list: string[]
    correct: number
    incorrect: number
  }
  options: {
    timer: number
    currentTimer: number
    status: 'pending' | 'started' | 'finished'
  }
}
type Action = {
  incrementCorretWord: () => void
  decrementCorretWord: () => void
  setCurrentTimer: (timer: number) => void
  setTimer: (status: State['options']['timer']) => void
  setWordsList: (status: State['words']['list']) => void
  setWordsLength: (status: State['words']['length']) => void
  setCurrentStatus: (status: State['options']['status']) => void
}

type Props = State & Action

const useTypingStore = create<Props>(set => ({
  words: {
    correct: 0,
    incorrect: 0,
    length: TIMER_INIT,
    list: new Array(TIMER_INIT)
      .fill(null)
      .map(() => generate())
      .flat()
  },
  options: {
    status: 'pending',
    timer: TIMER_INIT,
    currentTimer: TIMER_INIT
  },
  setTimer: timer => set(state => ({ options: { ...state.options, timer } })),
  setWordsList: list => set(state => ({ words: { ...state.words, list } })),
  setCurrentStatus: status =>
    set(state => ({ options: { ...state.options, status } })),
  setCurrentTimer: currentTimer =>
    set(state => ({ options: { ...state.options, currentTimer } })),
  incrementCorretWord: () =>
    set(state => ({
      words: { ...state.words, correct: state.words.correct + 1 }
    })),
  decrementCorretWord: () =>
    set(state => ({
      words: { ...state.words, incorrect: state.words.incorrect + 1 }
    })),
  setWordsLength: length =>
    set(state => ({
      words: {
        ...state.words,
        length,
        list: new Array(length)
          .fill(null)
          .map(() => generate())
          .flat()
      }
    }))
}))

export default useTypingStore
