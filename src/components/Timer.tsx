import React, { FC, useState, useEffect } from 'react'
import { Typography } from 'native-piece'
import useTypingStore from '@/stores/useTyping'

const Timer: FC = () => {
  const { options } = useTypingStore()
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

      // Exit the effect if the timer reaches 0
      if (seconds <= 0) {
        clearInterval(interval)
        setCurrentStatus('finished')
        return
      }

      setCurrentTimer(seconds)
      // Clean up the interval on unmount or when seconds become 0
      return () => {
        clearInterval(interval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, options.status])

  return <Typography as='span'>{seconds}</Typography>
}

export default Timer
