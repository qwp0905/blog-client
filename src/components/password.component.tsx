import { EventNoteRounded, Visibility, VisibilityOff } from '@mui/icons-material'
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
  set: React.Dispatch<React.SetStateAction<string>>
  enter?: () => unknown
  error?: boolean
  label?: string
}

const Password = ({ state, set, label = 'Password', error = false, enter }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    set(e.target.value)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && enter) {
      enter()
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
