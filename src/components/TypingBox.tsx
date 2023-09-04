import React, { FC, Fragment } from 'react'
import { Box } from 'native-piece'

import InputField from './Input'
import Character from './Character'
import { useTypingBox } from '@/hooks/useTypingBox'

interface Props {
  charClass: (i: number, idx: number, char: string) => void
  onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => void
}
const TypingBox: FC<Props> = ({ charClass, onKeyDown }) => {
  const {
    input,
    words,
    options,
    isCurrentTimer,
    handleOnChange
  } = useTypingBox()

  return (
    <>
      <Box marginTop={20}>
        <InputField
          type='text'
          value={input.text}
          pattern='^[a-z A-Z]*'
          onKeyDown={onKeyDown}
          placeholder='Empezar a escribir'
          disabled={options.status === 'finished'}
          className={`tst-input-chars ${isCurrentTimer}`}
          onChange={(e) => handleOnChange(e.target.value.toLowerCase())}
        />
      </Box>
      <Box position='relative'>
        <Box
          position='absolute'
          bottom={0}
          height={80}
          width='100%'
          background='linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(241,241,240,1) 100%)'
        />
        <Box height={130} overflow='hidden'>
          {words.list.map((word, i) => (
            <Fragment key={i}>
              <Box display='inline-block' data-word={word}>
                {word.split('').map((char, idx) => (
                  <Character
                    key={idx}
                    index={i}
                    idx={idx}
                    character={char}
                    getCharClass={charClass}
                  />
                ))}
              </Box>
              &nbsp;
            </Fragment>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default TypingBox
