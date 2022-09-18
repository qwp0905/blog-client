import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useEffect, useState } from 'react'
import { getJson } from '../services/request'

interface Props {
  user_id: number
}

interface TagResponse {
  tag_name: string
  quantity: number
}

const SideBar = ({ user_id }: Props) => {
  const [tags, setTags] = useState<TagResponse[]>([])

  const onCreated = async () => {
    const response: TagResponse[] = await getJson(`/user/tags?id=${user_id}`)
    setTags(response || [])
  }

  useEffect(() => {
    onCreated()
  }, [])

  return (
    <Box>
      <List>
        {tags.map(({ tag_name, quantity }, i) => {
          return (
            <ListItem key={i}>
              <ListItemButton>
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
