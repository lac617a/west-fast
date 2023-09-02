'use client'
import Image from 'next/image'
import { Box, VStack, Heading, Typography, Stack } from 'native-piece'

import { APP_NAME } from '@/constants'
// COMPONENTS
import Dashboard from '@/components/Dashboard'
import TypingSpeed from '@/components/TypingSpeed'
import TypingAnimated from '@/components/TypingAnimated'
import RandomFallingLetters from '@/components/RandomFallingLetters'

// ASSETS
import keyboardTyping from '@/assets/keyboard-typing.gif'

export default function Home() {
  return (
    <Box>
      <Box position='relative'>
        <Box className='tst-backdrop' />
        <Image
          className='tst-keyboard-typing'
          src={keyboardTyping} alt='keyboard-typing' width={1000} height={400}
        />
      </Box>
      <Box as='header' className='tst-header tst-round'>
        <Typography>{APP_NAME}</Typography>
      </Box>
      <Stack justifyContent='center' height={330}>
        <RandomFallingLetters />
        <Box marginTop={100} zIndex={10} position='relative'>
          <TypingAnimated />
        </Box>
      </Stack>
      <Box className='tst-background' paddingTop={30}>
        <Box maxWidth='72.5rem' width='100%' marginInline='auto'>
          <VStack gap={20} alignItems='center'>
            <VStack alignItems='center'>
              <Typography fontSize={20} textTransform='uppercase'>
                Prueba de velocidad de escritura
              </Typography>
              <Heading as='h1' className='tst-heading'>
                Pon a prueba tus habilidades de mecanografía
              </Heading>
            </VStack>
            <Box>
              <Dashboard />
              <Box paddingBlock={60}>
                <TypingSpeed />
              </Box>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}
