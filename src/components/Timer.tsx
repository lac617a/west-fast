import React, { FC, useState, useEffect } from 'react'
import { Typography } from 'native-piece'
import useTypingStore from '@/stores/useTyping'

const Timer: FC = () => {
  const { options, words } = useTypingStore()
  const [seconds, setSeconds] = useState(options.timer)
  const setCurrentTimer = useTypingStore(state => state.setCurrentTimer)
  const setCurrentStatus = useTypingStore(state => state.setCurrentStatus)

  useEffect(() => {
    if (options.timer) {
      setSeconds(options.timer)
    }
  }, [options.timer])

  useEffect(() => {
    if (options.status === 'started') {
      // Update the timer every second
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)

      setCurrentTimer(seconds)

      // Exit the effect if the timer reaches 0
      if (seconds <= 0 || words.list.length === 0) {
        clearInterval(interval)
        setCurrentStatus('finished')
        setSeconds(options.timer)
        return
      }

      // Clean up the interval on unmount or when seconds become 0
      return () => {
        clearInterval(interval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, options.status, words.list])

  return <Typography as='span'>{seconds}</Typography>
}

export default Timer
