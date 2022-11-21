import React from 'react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Box, Typography } from '@mui/material'

interface Props {
  content: string
}

const Markdown = ({ content }: Props) => {
  return (
    <ReactMarkDown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ inline, className, children, ...props }) => {
          return inline ? (
            <Typography
              component="span"
              bgcolor="ButtonHighlight"
              color="inherit"
              padding={0.3}
              {...props}
              className={className}
            >
              {children}
            </Typography>
          ) : (
            <Box
              sx={{
                bgcolor: 'rgb(50,50,50)',
                borderRadius: 1,
                paddingX: 2,
                color: 'white',
                paddingY: 3,
                maxWidth: '100%',
                overflow: 'auto'
              }}
            >
              <code className={className} {...props}>
                {children}
              </code>
            </Box>
          )
        },
        img: ({ src, ...props }) => {
          return <img style={{ maxWidth: '100%' }} src={src} {...props} />
        },
        a: ({ children, href, ...props }) => {
          return (
            <Typography
              component="a"
              href={href}
              sx={{
                ':hover': {
                  cursor: 'pointer',
                  opacity: 0.7
                },
                textDecoration: 'none',
                color: 'primary'
              }}
              {...props}
            >
              {children}
            </Typography>
          )
        }
      }}
    />
  )
}

export default Markdown
