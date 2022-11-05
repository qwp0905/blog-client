import React from 'react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
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
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={a11yDark as any}
              language={match[1]}
              PreTag="span"
              {...props}
            />
          ) : (
            <span {...props} className={className}>
              <Typography
                component="span"
                bgcolor="ButtonHighlight"
                color="primary"
                padding={0.3}
              >
                {children}
              </Typography>
            </span>
          )
        },
        img: ({ src, ...props }) => {
          return <img style={{ maxWidth: '100%' }} src={src} {...props} />
        }
      }}
    />
  )
}

export default Markdown
