import { Box } from 'native-piece'
import React, { useState, useLayoutEffect } from 'react'

const spawnInt = 500
const RandomFallingLetters = () => {
  const [random, setRandom] = useState({
    letter: '',
    position: 0
  })

  function randLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]

    function randLoc() {
      const randomLocation = Math.floor(Math.random() * window.innerWidth)
      const calcWidth = window.innerWidth - 85
      if (randomLocation > calcWidth) {
        return calcWidth
      } else {
        return randomLocation
      }
    }

    const posx = randLoc()

    setRandom({
      letter: randomLetter,
      position: posx
    })
  }

  useLayoutEffect(() => {
    const interval = setInterval(randLetters, spawnInt)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box overflow='hidden'>
      <span
        className='tst-random-letter'
        style={{ left: random.position }}
      >{random.letter}
      </span>
    </Box>
  )
}

export default RandomFallingLetters
