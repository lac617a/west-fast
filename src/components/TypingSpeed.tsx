import React, { Fragment } from 'react'
import { Box, Heading, Stack } from 'native-piece'

import { useTypingSpeed } from '@/hooks/useTypingSpeed'
import InputField from './Input'

const TypingSpeed = () => {
  const {
    words,
    options,
    currChar,
    currInput,
    getCharClass,
    charsToMatch,
    handleKeyDown,
    handleOnChange
  } = useTypingSpeed()

  return (
    <Box className='tst-round' paddingTop={40} maxWidth='50rem'>
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
      <Box marginTop={20} position='sticky' top={0}>
        <InputField
          type='text'
          disabled={options.status === 'finished'}
          value={currInput}
          pattern='^[a-z A-Z]*'
          onKeyDown={handleKeyDown}
          className='tst-input-chars'
          onChange={(e) => handleOnChange(e.target.value.toLowerCase())}
        />
      </Box>
      <Box>
        {words.list.map((word, i) => (
          <Fragment key={i}>
            <Box display='inline-block' data-word={word}>
              {word.split('').map((char, idx) => (
                <span
                  key={idx}
                  className={`tst-chars ${getCharClass(i, idx, char)}`}
                >
                  {char}
                </span>
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
