import { Box, Grid, InputBase, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

const WritePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag_temp, setTagTemp] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTag = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTagTemp(e.target.value)
  }

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      if (e.code === 'Enter') {
        e.preventDefault()
        if (!~tags.indexOf(tag_temp)) {
          setTags([...tags, tag_temp])
        }
        setTagTemp('')
      } else if (e.code === 'Backspace' && tag_temp === '') {
        e.preventDefault()
        setTags([...tags.slice(0, tags.length - 1)])
      }
    }
  }

  const tapKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.code)
  }

  return (
    <Box pt={5}>
      <Grid container>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputBase
              placeholder="제목을 입력하세요."
              sx={{ fontSize: 30 }}
              onChange={handleTitle}
              value={title}
            />
            <Grid container rowSpacing={1}>
              {tags.map((t, i) => (
                <Grid item key={i}>
                  <Box
                    borderRadius={1}
                    display="flex"
                    justifyContent="center"
                    bgcolor="ButtonHighlight"
                    p={0.3}
                    pr={0.9}
                    pl={0.9}
                    mr={1}
                  >
                    <Typography color="primary" fontSize={15}>
                      {t}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              <Grid item>
                <InputBase
                  placeholder="태그를 입력하세요."
                  value={tag_temp}
                  onChange={handleTag}
                  onKeyDown={addTag}
                  multiline
                />
              </Grid>
            </Grid>
            <InputBase
              placeholder="내용을 입력하세요."
              onChange={handleContent}
              value={content}
              multiline
              rows={20}
              sx={{ pt: 2 }}
            />
          </Stack>
        </Grid>
        <Grid item md={3} />
      </Grid>
    </Box>
  )
}

export default WritePage
