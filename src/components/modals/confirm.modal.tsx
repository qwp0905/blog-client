import React from 'react'
import { ButtonType } from '../../common/constants/enum'
import Button from '../elements/button'

interface Props {
  visibleSync: boolean
  message: string
  close: () => void
}

const Confirm = ({ visibleSync, message, close }: Props) => {
  const handleClose = () => {
    console.log(123123)
  }

  return (
    <div
      className={visibleSync ? 'flex justify-center items-center' : 'hidden'}
    >
      <div className="w-80 h-40 bg-white border border-stone-300 flex flex-col items-center justify-center rounded-md">
        <div>{message}</div>
        <div className="flex flex-row mt-5">
          <Button
            className="mt-1 mr-3"
            type={ButtonType.success}
            click={handleClose}
          >
            예
          </Button>
          <Button
            className="mt-1 ml-3"
            type={ButtonType.normal}
            click={handleClose}
          >
            아니오
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Confirm
