import { useState, KeyboardEvent } from 'react'
import useTypingStore from '@/stores/useTyping'
import utils from '@/utils'

export function useTypingSpeed() {
  const { options, words } = useTypingStore()
  const setCurrentStatus = useTypingStore(state => state.setCurrentStatus)
  const incrementCorretWord = useTypingStore(state => state.incrementCorretWord)
  const decrementCorretWord = useTypingStore(state => state.decrementCorretWord)

  const [currChar, setCurrChar] = useState<string>('')
  const [currInput, setCurrInput] = useState<string>('')
  const [currWordIndex, setCurrWordIndex] = useState<number>(0)
  const [currCharIndex, setCurrCharIndex] = useState<number>(-1)

  const handleKeyDown = ({ keyCode, key }: KeyboardEvent<HTMLInputElement>) => {
    const kcode = keyCode
    // space bar
    if (kcode === 32) {
      setCurrInput('')
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)
      // backspace
    } else if (kcode === 8) {
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar('')
    } else {
      // (kcode > 47 && kcode < 58) numbers
      // (kcode > 96 && kcode < 123) extra
      // Only string chars
      if (kcode > 64 && kcode < 91) {
        setCurrCharIndex(currCharIndex + 1)
        setCurrChar(key)
        checkMatch(key)
      }
    }
  }

  const charsToMatch = (key: string, max: number) => {
    const charsToCompare = words.list[currWordIndex]?.[currCharIndex + max]
    const doesItMatch = charsToCompare === key
    return doesItMatch
  }

  const checkMatch = (key: string) => {
    if (charsToMatch(key, 1)) incrementCorretWord()
    else decrementCorretWord()
  }

  const getCharClass = (wordIdx: number, charIdx: number, char: string) => {
    const hasDanger = 'tst-has-danger'
    const hasSuccess = 'tst-has-success'
    if (
      currChar &&
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      options.status !== 'finished'
    ) {
      if (char === currChar) return hasSuccess
      else return hasDanger
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words.list[currWordIndex].length
    ) return hasDanger
    else return ''
  }

  const handleOnChange = (value: string) => {
    if (options.status === 'pending') {
      setCurrentStatus('started')
    }
    const isString = utils.isString(value)
    if (isString) setCurrInput(value)
  }

  return {
    words,
    options,
    currChar,
    currInput,
    setCurrInput,
    charsToMatch,
    getCharClass,
    handleKeyDown,
    handleOnChange
  }
}
