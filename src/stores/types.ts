export type State = {
  words: {
    list: string[]
    length: number
    correct: number
    incorrect: number
    writeLength: number
  }
  options: {
    timer: number
    currentTimer: number
    status: 'pending' | 'started' | 'finished'
  }
}
export type Actions = {
  reset: () => void
  //! ==========OPTIONS==========
  setCurrentTimer: (timer: number) => void
  setTimer: (status: State['options']['timer']) => void
  setCurrentStatus: (status: State['options']['status']) => void

  //! ==========WORDS==========
  incrementCorretWord: () => void
  decrementCorretWord: () => void
  setWordsWriteLength: () => void
  deleteWordsOfList: (index: number) => void
  setWordsList: (status: State['words']['list']) => void
  setWordsLength: (status: State['words']['length']) => void
}

export type Props = State & Actions
