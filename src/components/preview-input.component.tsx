import { Stack, Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import LinkAddButton from './link-add-button.component'
import MarkdownInput from './markdown-input.component'
import Markdown from './markdown.component'
import ImageButton from './image-input.component'

interface Props {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const PreviewInputSet = ({ state, setState }: Props) => {
  const [mode, setMode] = useState('write')

  const handlePreview = (e: React.SyntheticEvent, newValue: string) => {
    setMode(newValue)
  }

  return (
    <Stack spacing={1}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Tabs value={mode} onChange={handlePreview}>
            <Tab value="write" label="WRITE" />
            <Tab value="preview" label="PREVIEW" />
          </Tabs>
        </Box>
        <Box display="flex">
          <ImageButton mr={1} setState={setState} />
          <LinkAddButton setState={setState} />
        </Box>
      </Box>
      {mode === 'write' ? (
        <MarkdownInput
          state={state}
          setState={setState}
          placeholder="내용을 입력하세요."
          multiline
          rows={20}
          sx={{
            padding: 2,
            border: '1px solid',
            borderColor: 'ButtonHighlight',
            borderRadius: 1
          }}
        />
      ) : (
        <Box
          sx={{
            padding: 2,
            border: '1px solid',
            borderColor: 'ButtonHighlight',
            borderRadius: 1
          }}
        >
          <Markdown content={state} />
        </Box>
      )}
    </Stack>
  )
}

export default PreviewInputSet
