import React, { FC, InputHTMLAttributes } from 'react'
import { Typography, VStack } from 'native-piece'
import utils from '@/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const InputField: FC<Props> = (props) => {
  const { label, name, helperText, className, ...rest } = props
  const classNames = utils.classNames(`tst-input ${className}`)
  return (
    <VStack gap={5} width='100%'>
      <label className='tst-input-label' htmlFor={name}>{label}</label>
      <input {...rest} className={classNames} id={name} />
      {helperText && (
        <Typography>{helperText}</Typography>
      )}
    </VStack>
  )
}

export default InputField
