import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import React, { useState } from 'react'

interface Props {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  enter?: () => unknown
  error?: boolean
  label?: string
}

const Password = ({
  state,
  setState,
  label = 'Password',
  error = false,
  enter
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      if (e.code === 'Enter' && enter) {
        enter()
      }
    }
  }

  const id = crypto.randomUUID()

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={state}
        onChange={handlePassword}
        onKeyDown={handleKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        error={error}
      />
    </FormControl>
  )
}

export default Password
