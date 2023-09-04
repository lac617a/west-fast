import React from 'react'
import { Box, Button, Heading, Stack } from 'native-piece'

import TypingBox from './TypingBox'
import { useTypingSpeed } from '@/hooks/useTypingSpeed'

const TypingSpeed = () => {
  const {
    options,
    currChar,
    resetStore,
    charsToMatch,
    getCharClass,
    handleKeyDown
  } = useTypingSpeed()

  return (
    <Box className='tst-round' paddingTop={40} maxWidth='50rem' width='100%'>
      {options.status === 'finished' && (
        <Button className='tst-btn' onClick={resetStore} position='absolute' top={-20}>
          Empezar de nuevo
        </Button>
      )}
      {options.status === 'started' && (
        <Stack
          className='tst-round tst-chars-large-one'
          selectors={{ ':hover': { transform: 'scale(1.05)' } }}
          borderColor={
            charsToMatch(currChar, 0)
              ? 'var(--color-success)'
              : 'var(--color-danger)'
          }
        >
          <Heading className='tst-heading'>{currChar}</Heading>
        </Stack>
      )}
      <TypingBox charClass={getCharClass} onKeyDown={handleKeyDown} />
    </Box>
  )
}

export default TypingSpeed
