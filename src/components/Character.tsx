import React, { FC } from 'react'

interface Props {
  idx: number;
  index: number;
  character: string;
  getCharClass: (i: number, idx: number, char: string) => void
}
const Character: FC<Props> = ({ index, idx, character, getCharClass }) => {
  return (
    <span
      className={`tst-chars ${getCharClass(index, idx, character)}`}
    >
      {character}
    </span>
  )
}

export default Character
