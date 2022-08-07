import React from 'react'
import { ButtonType } from '../../common/constants/enum'

interface Props {
  onClick?: (e?: any) => void
  type?: ButtonType
  children?: string
  className?: string
}

const Button = ({
  onClick,
  type,
  children = '버튼',
  className = ''
}: Props) => {
  return (
    <div className={`h-max w-max ${className}`}>
      <label htmlFor="label">
        <div className="bg-green-700 cursor-pointer w-20 h-9 rounded-sm flex items-center justify-center">
          <div className="text-white text-lg">{children}</div>
        </div>
      </label>
      <button onClick={onClick} id="label" className="hidden" />
    </div>
  )
}

export default Button
