import React, { useEffect, useState } from 'react'
import { ButtonType } from '../common/constants/enum'
import Button from '../components/elements/button'
import Input from '../components/elements/input'
import Confirm from '../components/modals/confirm.modal'

const MainPage = () => {
  const [value, setValue] = useState('')

  const [modal, setModal] = useState(false)

  const click = (e: any) => {
    console.log(123123)
  }
  const change = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div className="w-screen h-screen flex">
      <div>Main Page</div>
      <div className="flex flex-row justify-start">
        <Input
          className="mt-2 ml-2"
          type="text"
          placeholder="입력하시라"
          onChange={change}
        />
        <Button
          className="mt-2 ml-2"
          click={() => setModal(true)}
          type={ButtonType.success}
        >
          수정
        </Button>
      </div>
      <Confirm
        visibleSync={modal}
        message="모달온"
        close={() => setModal(false)}
      />
    </div>
  )
}

export default MainPage
