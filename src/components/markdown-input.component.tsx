import { InputBase, InputBaseProps } from '@mui/material'
import React from 'react'

interface Props extends InputBaseProps {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const MarkdownInput = ({ state, setState, ...props }: Props) => {
  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const tapKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      if (e.code === 'Tab') {
        e.preventDefault()
        const start = e.currentTarget.selectionStart as number
        const end = e.currentTarget.selectionEnd as number

        setState(state.slice(0, start) + '    ' + state.slice(end, state.length))

        e.currentTarget.setRangeText('    ')
        e.currentTarget.setSelectionRange(start + 4, start + 4)
      }
    }
  }

  return <InputBase {...props} value={state} onChange={handleState} onKeyDown={tapKey} />
}

export default MarkdownInput
