import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getJson } from '../services/request'

interface Props {
  user_id?: string
}

interface TagResponse {
  tag_name: string
  quantity: number
}

const SideBar = ({ user_id }: Props) => {
  const [tags, setTags] = useState<TagResponse[]>([])

  const onCreated = async () => {
    const response: TagResponse[] = await getJson(
      `/article/tags` + ((user_id && `?id=${user_id}`) || '')
    )
    setTags(response || [])
  }

  useEffect(() => {
    onCreated()
  }, [])

  return (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            LinkComponent="a"
            href={`/` + ((user_id && `?id=${user_id}`) || '')}
          >
            <ListItemText
              primary={`전체 (${tags.reduce((a, c) => a + c.quantity, 0)})`}
            />
          </ListItemButton>
        </ListItem>
        {tags.map(({ tag_name, quantity }, i) => {
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton
                LinkComponent="a"
                href={
                  `/` +
                  ((tag_name && `?tag=${tag_name}`) || '') +
                  ((user_id && `?id=${user_id}`) || '')
                }
              >
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
