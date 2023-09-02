import React, { useState } from 'react'
import Image from 'next/image'
// import FadeIn from 'react-fade-in'
import { Box, Button, Stack, Typography, VStack } from 'native-piece'

import InputField from './Input'
import CountDownTimer from './CountDownTimer'
import { useTypingSpeedResults } from '@/hooks/useTypingSpeedResults'
import GearIcon from '@/assets/gear.png'
import utils from '@/utils'

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
  }

  return (
    <Box maxWidth='max-content' marginInline='auto'>
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
      </Stack>
      <Box
        className='tst-round'
        position='absolute'
        bottom={-220}
        zIndex={1}
        transition='300ms'
        borderRadius='0 12px 12px 12px'
        visibility={showGear ? 'visible' : 'hidden'}
        boxShadow='0px 0px 10px -4px rgba(0, 0, 0, .3)'
      >
        <Stack gap='1rem' justifyContent='space-between'>
          <InputField
            name='seconds'
            label='Segundos'
            minLength={10}
            maxLength={1000}
            pattern='^[0-9]*'
            value={seconds}
            placeholder='Desde (10) hasta (1000)'
            helperText='El mínimo de segundos es (10) hasta (1000)'
            onChange={(e) => {
              const value = e.target.value
              console.log({ value })
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
            helperText='Máximo de palabras para escribir'
            placeholder='Máximo de palabras para escribir'
            onChange={(e) => {
              const value = e.target.value
              if (value === '') setWordLength(0)
              if (utils.isNumber(value) && value.length <= 4) {
                setWordLength(Number(value))
              }
            }}
          />
          {/* <FadeIn
            visible={showGear}
            wrapperTag={(props) => <Stack gap='1rem' width='100%' {...props} />}
          >
          </FadeIn> */}
        </Stack>
        <Stack justifyContent='flex-end' gap='1rem'>
          <Button
            className='tst-btn danger'
            onClick={() => setShowGear(false)}
          >
            Cancelar
          </Button>
          <Button
            className='tst-btn primary'
            onClick={handleOnAccep}
          >
            Aceptar
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default Dashboard
