import {
  Box,
  BoxProps,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField
} from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink'
import React, { useState } from 'react'

interface Props extends BoxProps {
  setState: React.Dispatch<React.SetStateAction<string>>
}

const LinkAddButton = ({ setState, ...props }: Props) => {
  const [link, setLink] = useState('')
  const [open, setOpen] = useState(false)

  const openLinkModal = () => {
    setOpen(true)
  }

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const submitLink = () => {
    setState((content) => content + `  \n[${link}](${link})  \n`)
    close()
  }

  const close = () => {
    setOpen(false)
    setLink('')
  }

  return (
    <Box {...props} display="flex" alignItems="center">
      <IconButton onClick={openLinkModal} size="small" color="inherit">
        <AddLinkIcon />
      </IconButton>
      <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={close}>
        <DialogContent>
          <TextField
            value={link}
            onChange={handleLink}
            fullWidth
            autoFocus
            variant="standard"
            label="link"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitLink}>입력</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LinkAddButton
