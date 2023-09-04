import { useEffect, useState, KeyboardEvent } from 'react'
import useTypingStore from '@/stores/useTyping'
import { HAS_DANGER, HAS_SUCCESS } from '@/constants'

export function useTypingSpeed() {
  const { options, words, input } = useTypingStore()

  const resetStore = useTypingStore(state => state.reset)
  const setInputText = useTypingStore(state => state.setInputText)
  const deleteWordsOfList = useTypingStore(state => state.deleteWordsOfList)
  const incrementCorretWord = useTypingStore(state => state.incrementCorretWord)
  const decrementCorretWord = useTypingStore(state => state.decrementCorretWord)
  const setWordsWriteLength = useTypingStore(state => state.setWordsWriteLength)

  const [currWordIndex] = useState<number>(0)
  const [currChar, setCurrChar] = useState<string>('')
  const [currCharIndex, setCurrCharIndex] = useState<number>(-1)

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
    setInputText('')
    // setCurrWordIndex(currWordIndex + 1)
    setCurrCharIndex(-1)
  }

  const wordsToMatch = () => {
    const wordsList = words.list
    const wordToCompare = wordsList[currWordIndex]
    const doesItMatch = wordToCompare === input.text.trim()
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
      if (char === currChar) return HAS_SUCCESS
      else return HAS_DANGER
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words.list[currWordIndex].length
    ) return HAS_DANGER
    else return ''
  }

  useEffect(() => {
    if (options.status === 'pending') {
      setCurrChar('')
      setInputText('')
      setCurrCharIndex(-1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.status])

  return {
    words,
    input,
    options,
    currChar,
    resetStore,
    setInputText,
    charsToMatch,
    getCharClass,
    handleKeyDown
  }
}
