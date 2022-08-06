import React, { HTMLInputTypeAttribute } from 'react'

interface Props {
  type?: HTMLInputTypeAttribute
  placeholder?: string
  size?: string
}

const Input = ({ type = 'text', placeholder = '' }: Props) => {
  return (
    <div>
      <input className="h-20 w-100" type={type} placeholder={placeholder} />
    </div>
  )
}

export default Input
