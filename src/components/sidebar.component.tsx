import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { decryptAES } from '../common/utils/aes'
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
      `/article/tags` + ((account_id && `?id=${decryptAES(account_id)}`) || '')
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
                href={
                  `/` +
                  ((tag_name && `?tag=${tag_name}`) || '') +
                  ((account_id && `${(tag_name && `&`) || `?`}id=${account_id}`) || '')
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
