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
              {...props}
              component="span"
              bgcolor="ButtonHighlight"
              color="inherit"
              padding={0.3}
              letterSpacing={0.3}
              lineHeight={1.5}
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
                overflow: 'auto',
                letterSpacing: 0.3,
                lineHeight: 1.5
              }}
            >
              <code className={className} {...props}>
                {children}
              </code>
            </Box>
          )
        },
        img: ({ src, alt, ...props }) => {
          return <img style={{ maxWidth: '100%' }} src={src} alt={alt || ''} {...props} />
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
              letterSpacing={0.3}
              lineHeight={1.5}
              {...props}
            >
              {children}
            </Typography>
          )
        },
        p: ({ children, ...props }) => {
          return (
            <Box component="p" letterSpacing={0.3} lineHeight={1.5} {...props}>
              {children}
            </Box>
          )
        }
      }}
    />
  )
}

export default Markdown
