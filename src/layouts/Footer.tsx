'use client'
import React from 'react'
import { Box, Typography, VStack } from 'native-piece'

const LayoutFooter = () => {
  return (
    <Box padding={20} borderTop='2px solid var(--background-color)'>
      <VStack alignItems='center'>
        <Typography>
          Creado por Yoydev con <span title='<3'>❤</span>. Alojado en <a href='https://vercel.com/' target='_blank' rel='noopener noreferrer'>Vercel</a>.
        </Typography>
        <Typography>
          &copy; Todos los derechos reservados.
        </Typography>
      </VStack>
    </Box>
  )
}

export default LayoutFooter
