import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getJson } from '../services/request'

interface Props {
  user_id?: string
  target: React.Dispatch<React.SetStateAction<string | null>>
}

interface TagResponse {
  tag_name: string
  quantity: number
}

const SideBar = ({ user_id, target: setTarget }: Props) => {
  const [tags, setTags] = useState<TagResponse[]>([])

  const onCreated = async () => {
    const response: TagResponse[] = await getJson(
      `/article/tags` + ((user_id && `?id=${user_id}`) || '')
    )
    setTags(response || [])
  }

  const handleClick = (tag?: string) => {
    setTarget(tag || null)
  }

  useEffect(() => {
    onCreated()
  }, [])

  return (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick()}>
            <ListItemText primary={`전체보기`} />
          </ListItemButton>
        </ListItem>
        {tags.map(({ tag_name, quantity }, i) => {
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton onClick={() => handleClick(tag_name)}>
                <ListItemText primary={`${tag_name} (${quantity})`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
export default SideBar
