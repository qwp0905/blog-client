import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { requestGet } from '../services/request'

interface TagResponse {
  tag_name: string
  quantity: number
}

const SideBar = () => {
  const [tags, setTags] = useState<TagResponse[]>([])

  const onCreated = async () => {
    const response: TagResponse[] = await requestGet(`/article/tags`)
    setTags(response || [])
  }

  useEffect(() => {
    onCreated()
  }, [])

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton LinkComponent="a" href="/">
          <ListItemText
            primary={
              (tags.length && `${tags[0].tag_name} (${tags[0].quantity})`) || `전체 (0)`
            }
          />
        </ListItemButton>
      </ListItem>
      {tags.slice(1).map(({ tag_name, quantity }, i) => {
        return (
          <ListItem key={i} disablePadding>
            <ListItemButton
              LinkComponent="a"
              href={`/` + ((tag_name && `?tag=${tag_name}`) || '')}
            >
              <ListItemText primary={`${tag_name} (${quantity})`} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
export default SideBar
