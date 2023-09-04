import React from 'react'
import { Box, VStack } from 'native-piece'

import Timer from './Timer'
import useTypingStore from '@/stores/useTyping'
import { TIME } from '@/constants'

const CountDownTimer = () => {
  const { options } = useTypingStore()

  return (
    <VStack position='relative' alignItems='center'>
      <svg viewBox='0 0 110 110' width='110' height='110'>
        <circle
          cx='55'
          cy='55'
          r='53'
          fill='none'
          strokeDasharray='332px'
          style={{ animationDuration: `${options.timer + 1}s` }}
          className={options.status === 'started' ? 'started' : ''}
        />
      </svg>
      <Box className='tst-timer'>
        <Timer />
        {TIME[0]}
      </Box>
    </VStack>
  )
}

export default CountDownTimer
