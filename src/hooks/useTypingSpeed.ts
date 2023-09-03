import { useEffect, useState, KeyboardEvent, useMemo } from 'react'
import useTypingStore from '@/stores/useTyping'
import utils from '@/utils'
import { STATUS_TYPING } from '@/constants'

const hasDanger = 'tst-has-danger'
const hasSuccess = 'tst-has-success'

export function useTypingSpeed() {
  const { options, words } = useTypingStore()
  const setCurrentStatus = useTypingStore(state => state.setCurrentStatus)
  const deleteWordsOfList = useTypingStore(state => state.deleteWordsOfList)
  const resetStore = useTypingStore(state => state.reset)
  const incrementCorretWord = useTypingStore(state => state.incrementCorretWord)
  const decrementCorretWord = useTypingStore(state => state.decrementCorretWord)
  const setWordsWriteLength = useTypingStore(state => state.setWordsWriteLength)

  const [currWordIndex] = useState<number>(0)
  const [currChar, setCurrChar] = useState<string>('')
  const [currInput, setCurrInput] = useState<string>('')
  const [currCharIndex, setCurrCharIndex] = useState<number>(-1)

  const isCurrentTimer = useMemo(
    () => (options.currentTimer >= 1 ? hasSuccess : hasDanger),
    [options.currentTimer]
  )

  const handleKeyDown = ({ keyCode, key }: KeyboardEvent<HTMLInputElement>) => {
    const kcode = keyCode
    // space bar
    if (kcode === 32) {
      handleSpaceBar()
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

  const handleSpaceBar = () => {
    wordsToMatch()
    setCurrInput('')
    // setCurrWordIndex(currWordIndex + 1)
    setCurrCharIndex(-1)
  }

  const wordsToMatch = () => {
    const wordsList = words.list
    const wordToCompare = wordsList[currWordIndex]
    const doesItMatch = wordToCompare === currInput.trim()
    if (doesItMatch) setWordsWriteLength()
    deleteWordsOfList(currWordIndex)
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

  useEffect(() => {
    if (options.status === 'finished') {
      setCurrInput(
        isCurrentTimer === 'tst-has-success'
          ? STATUS_TYPING[1]
          : STATUS_TYPING[0]
      )
    }
  }, [isCurrentTimer, options.status])

  useEffect(() => {
    if (options.status === 'pending') {
      setCurrChar('')
      setCurrInput('')
      setCurrCharIndex(-1)
    }
  }, [options.status])

  return {
    words,
    options,
    currChar,
    currInput,
    resetStore,
    setCurrInput,
    charsToMatch,
    getCharClass,
    handleKeyDown,
    isCurrentTimer,
    handleOnChange
  }
}
