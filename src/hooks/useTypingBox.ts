import { useMemo, useEffect } from 'react'
import useTypingStore from '@/stores/useTyping'
import { HAS_DANGER, HAS_SUCCESS, STATUS_TYPING } from '@/constants'
import utils from '@/utils'

export function useTypingBox() {
  const { options, words, input } = useTypingStore()
  const setInputText = useTypingStore(state => state.setInputText)
  const setCurrentStatus = useTypingStore(state => state.setCurrentStatus)

  const isCurrentTimer = useMemo(
    () => (options.currentTimer >= 1 ? HAS_SUCCESS : HAS_DANGER),
    [options.currentTimer]
  )

  const handleOnChange = (value: string) => {
    if (options.status === 'pending') {
      setCurrentStatus('started')
    }
    const isString = utils.isString(value)
    if (isString) setInputText(value)
  }

  useEffect(() => {
    if (options.status === 'finished') {
      setInputText(
        isCurrentTimer === HAS_SUCCESS
          ? STATUS_TYPING[1]
          : STATUS_TYPING[0]
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentTimer, options.status])

  return {
    words,
    input,
    options,
    isCurrentTimer,
    handleOnChange
  }
}
