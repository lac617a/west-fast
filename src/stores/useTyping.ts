import { create } from 'zustand'

import utils from '@/utils'
import { Props } from './types'
import initialState from './states'
import { TIMER_INIT } from '@/constants'

const useTypingStore = create<Props>(set => ({
  ...initialState,
  reset: () =>
    set(() => ({
      ...initialState,
      words: { ...initialState.words, list: utils.generateWords(TIMER_INIT) }
    })),
  //! ==========INPUTS==========
  setInputText: text => set(state => ({ input: { ...state.input, text } })),
  setInputLength: length =>
    set(state => ({ input: { ...state.input, length } })),
  //! ==========OPTIONS==========
  setTimer: timer => set(state => ({ options: { ...state.options, timer } })),
  setCurrentStatus: status =>
    set(state => ({ options: { ...state.options, status } })),
  setCurrentTimer: currentTimer =>
    set(state => ({ options: { ...state.options, currentTimer } })),
  //! ==========WORDS==========
  setWordsList: list => set(state => ({ words: { ...state.words, list } })),
  setWordsWriteLength: () =>
    set(state => ({
      words: { ...state.words, writeLength: state.words.writeLength + 1 }
    })),
  incrementCorretWord: () =>
    set(state => ({
      words: { ...state.words, correct: state.words.correct + 1 }
    })),
  decrementCorretWord: () =>
    set(state => ({
      words: { ...state.words, incorrect: state.words.incorrect + 1 }
    })),
  deleteWordsOfList: index =>
    set(state => ({
      words: {
        ...state.words,
        list: state.words.list.filter((_, indx) => indx !== index)
      }
    })),
  setWordsLength: length =>
    set(state => ({
      words: {
        ...state.words,
        length,
        list: utils.generateWords(length)
      }
    }))
}))

export default useTypingStore
