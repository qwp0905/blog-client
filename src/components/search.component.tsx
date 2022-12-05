import {
  Box,
  BoxProps,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'

const Search = (props: BoxProps) => {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Box {...props} display="flex" alignItems="center" justifyContent="center">
      <IconButton onClick={openModal}>
        <SearchIcon />
      </IconButton>

      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>검색</DialogTitle>
        <DialogContent>
          <InputBase />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Search
