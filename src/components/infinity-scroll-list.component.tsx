import { List, ListProps } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { PAGE_LIMIT } from '../common/constants/page'

interface Props extends Omit<ListProps, 'children'> {
  children: JSX.Element[]
  setList: React.Dispatch<React.SetStateAction<any[]>>
  getItems: (page: number) => Promise<any[]>
}

const InfinityScrollList = ({ children, setList, getItems, ...props }: Props) => {
  const [page, setPage] = useState(1)
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [scrollEnd, setScrollEnd] = useState(false)

  const getNext = useCallback(async () => {
    const response = await getItems(page)
    if (response) {
      setList((list) => list.concat(response.slice(0, PAGE_LIMIT)))
      if (response.length <= PAGE_LIMIT) {
        setScrollEnd(true)
      }
    } else {
      setScrollEnd(true)
    }
  }, [page, setList, getItems])

  const handleScroll: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (!scrollEnd && entries[0].isIntersecting) {
        setPage((page) => page + 1)
      }
    },
    [scrollEnd]
  )

  useEffect(() => {
    if (target) {
      const io = new IntersectionObserver(handleScroll, { threshold: 1.0 })
      io.observe(target)
      return () => io.disconnect()
    }
  }, [target, handleScroll])

  useEffect(() => {
    if (!scrollEnd) {
      getNext()
    }
  }, [getNext, scrollEnd])

  return (
    <List {...props}>
      {children}
      <div ref={setTarget} />
    </List>
  )
}

export default InfinityScrollList
