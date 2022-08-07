import React from 'react'
import { ButtonType } from '../../common/constants/enum'

interface Props {
  click: React.MouseEventHandler<HTMLButtonElement>
  type?: ButtonType
  children?: string
  className?: string
}

const Button = ({
  click,
  type = ButtonType.normal,
  children = '버튼',
  className = ''
}: Props) => {
  const backgroud = (() => {
    switch (type) {
      case ButtonType.success:
        return 'bg-blue-500'
      case ButtonType.warning:
        return 'bg-red-600'
      default:
        return 'bg-white'
    }
  })()

  return (
    <div className={`h-max w-max ${className}`}>
      <label htmlFor="label">
        <div
          className={`${backgroud} cursor-pointer w-20 h-9 rounded-sm flex items-center justify-center ${
            type === ButtonType.normal ? 'border border-stone-300' : ''
          }`}
        >
          <div
            className={`${
              type === ButtonType.normal ? 'text-black' : 'text-white'
            } text-lg`}
          >
            {children}
          </div>
        </div>
      </label>
      <button onClick={click} id="label" className="hidden" />
    </div>
  )
}

export default Button
