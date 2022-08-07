import React, { useState } from 'react'
import { ButtonType } from '../common/constants/enum'
import Button from '../components/elements/button'
import Input from '../components/elements/input'

const MainPage = () => {
  const [value, setValue] = useState('')
  const click = (e: any) => {
    console.log(value)
  }
  const change = (e: any) => {
    setValue(e.target.value)
  }
  return (
    <div>
      <div>Main Page</div>
      <div className="flex flex-row justify-start">
        <Input
          className="mt-2 ml-2"
          type="text"
          placeholder="입력하시라"
          onChange={change}
        />
        <Button className="mt-2 ml-2" onClick={click} type={ButtonType.success}>
          수정
        </Button>
      </div>
    </div>
  )
}

export default MainPage
