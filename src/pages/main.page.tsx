import React from 'react'
import { ButtonType } from '../common/constants/enum'
import Button from '../components/elements/button'

const MainPage = () => {
  const click = (e: any) => {
    console.log(123123123)
  }
  return (
    <div>
      <div>Main Page</div>
      <Button onClick={click} type={ButtonType.success}>
        수정
      </Button>
    </div>
  )
}

export default MainPage
