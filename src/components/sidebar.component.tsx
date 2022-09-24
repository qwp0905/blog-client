import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getJson } from '../services/request'

interface Props {
  account_id?: string
}

interface TagResponse {
  tag_name: string
  quantity: number
}

const SideBar = ({ account_id }: Props) => {
  const [tags, setTags] = useState<TagResponse[]>([])

  const onCreated = async () => {
    const response: TagResponse[] = await getJson(
      `/article/tags` + ((account_id && `?id=${account_id}`) || '')
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
            href={`/` + ((account_id && `?id=${account_id}`) || '')}
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
                  ((account_id && `?id=${account_id}`) || '')
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
