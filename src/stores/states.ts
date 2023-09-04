import utils from '@/utils'
import { State } from './types'
import { TIMER_INIT } from '@/constants'

const initialState: State = {
  input: {
    text: '',
    length: 0
  },
  words: {
    correct: 0,
    incorrect: 0,
    writeLength: 0,
    length: TIMER_INIT,
    list: utils.generateWords(TIMER_INIT)
  },
  options: {
    time: 'seg',
    status: 'pending',
    timer: TIMER_INIT,
    currentTimer: TIMER_INIT
  }
}

export default initialState
