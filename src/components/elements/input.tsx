import React, { HTMLInputTypeAttribute } from 'react'

interface Props {
  type?: HTMLInputTypeAttribute
  placeholder?: string
  size?: string
  className?: string
  onChange?: (e: any) => void
}

const Input = ({
  type = 'text',
  placeholder = '',
  className,
  size,
  onChange
}: Props) => {
  return (
    <div className={`h-max w-max ${className}`}>
      <input
        className="h-9 w-80 border border-stone-300 border-solid rounded-sm pl-1"
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
