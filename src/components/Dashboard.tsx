import React, { useState } from 'react'
import Image from 'next/image'
import { Box, Button, Stack, Typography, VStack } from 'native-piece'

import utils from '@/utils'
import InputField from './Input'
import CountDownTimer from './CountDownTimer'
import { useTypingSpeedResults } from '@/hooks/useTypingSpeedResults'

import GearIcon from '@/assets/gear.png'

const Dashboard = () => {
  const [seconds, setSeconds] = useState<number>(20)
  const [showGear, setShowGear] = useState<boolean>(false)
  const [wordLength, setWordLength] = useState<number>(20)

  const {
    setTimer,
    setWordsLength,
    calculateCharsScore,
    calculateWordsScore,
    calculateAccurancyScore
  } = useTypingSpeedResults()

  const handleOnAccep = () => {
    setTimer(seconds)
    setWordsLength(wordLength)
    setShowGear(false)
  }

  return (
    <Box position='relative' maxWidth='max-content' marginInline='auto'>
      <Stack className='tst-round' zIndex={2}>
        <Box marginRight='4rem'>
          <CountDownTimer />
        </Box>
        <Stack gap={12}>
          <VStack alignItems='center'>
            <Typography className='tst-metric'>
              {calculateWordsScore()}
            </Typography>
            words/min
          </VStack>
          <VStack alignItems='center'>
            <Typography className='tst-metric'>
              {calculateCharsScore()}
            </Typography>
            chars/min
          </VStack>
          <VStack alignItems='center'>
            <Typography className='tst-metric'>
              {calculateAccurancyScore()}
            </Typography>
            %accuracy
          </VStack>
        </Stack>
        <Stack className='tst-round' position='absolute' top={0} right={-45}>
          <Button
            cursor='pointer'
            transition='300ms'
            onClick={() => setShowGear(prev => !prev)}
            selectors={{ ':hover': { transform: 'rotate(35deg)' } }}
          >
            <Image src={GearIcon} width={24} height={24} alt='gear' />
          </Button>
        </Stack>
        <Box className={`tst-round tst-gear ${showGear ? 'visible' : 'hidden'}`}>
          <VStack gap='1rem'>
            <InputField
              name='seconds'
              label='Segundos'
              minLength={10}
              maxLength={1000}
              pattern='^[0-9]*'
              value={seconds}
              className='tst-input-chars'
              placeholder='Desde (10) hasta (1000)'
              style={{ padding: 0, textAlign: 'center' }}
              helperText='El mínimo de segundos es (10) hasta (1000)'
              onChange={(e) => {
                const value = e.target.value
                if (value === '') setSeconds(0)
                if (utils.isNumber(value) && value.length <= 4) {
                  setSeconds(Number(value))
                }
              }}
            />
            <InputField
              name='words'
              label='Palabras'
              minLength={10}
              maxLength={200}
              pattern='^[0-9]*'
              value={wordLength}
              className='tst-input-chars'
              style={{ padding: 0, textAlign: 'center' }}
              helperText='Máximo de palabras'
              placeholder='Máximo de palabras'
              onChange={(e) => {
                const value = e.target.value
                if (value === '') setWordLength(0)
                if (utils.isNumber(value) && value.length <= 4) {
                  setWordLength(Number(value))
                }
              }}
            />
            <VStack>
              <Button
                className='tst-btn primary'
                onClick={handleOnAccep}
              >
                Aceptar
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Dashboard
