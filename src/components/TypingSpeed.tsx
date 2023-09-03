import React, { Fragment } from 'react'
import { Box, Button, Heading, Stack } from 'native-piece'

import { useTypingSpeed } from '@/hooks/useTypingSpeed'
import InputField from './Input'
import Character from './Character'

const TypingSpeed = () => {
  const {
    words,
    options,
    currChar,
    currInput,
    resetStore,
    getCharClass,
    charsToMatch,
    handleKeyDown,
    isCurrentTimer,
    handleOnChange
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
      <Box marginTop={20} position='sticky' top={0}>
        <InputField
          type='text'
          value={currInput}
          pattern='^[a-z A-Z]*'
          onKeyDown={handleKeyDown}
          placeholder='Empezar a escribir'
          disabled={options.status === 'finished'}
          className={`tst-input-chars ${isCurrentTimer}`}
          onChange={(e) => handleOnChange(e.target.value.toLowerCase())}
        />
      </Box>
      <Box>
        {words.list.map((word, i) => (
          <Fragment key={i}>
            <Box display='inline-block' data-word={word}>
              {word.split('').map((char, idx) => (
                <Character
                  key={idx}
                  index={i}
                  idx={idx}
                  character={char}
                  getCharClass={getCharClass}
                />
              ))}
            </Box>
            &nbsp;
          </Fragment>
        ))}
      </Box>
    </Box>
  )
}

export default TypingSpeed
