import { Box } from '@mui/material'
import { HTMLAttributes } from 'react'

interface SelectOptionsProps {
  props: HTMLAttributes<HTMLElement>
  parts: any[]
}

export const SelectOptions = ({ props, parts }: SelectOptionsProps) => {
  return (
    <li
      {...props}
      style={{
        paddingBottom: '0px',
        marginLeft: '5px',
        marginRight: '5px',
        marginTop: '-1px',
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid #f2f2f2 !important',
          width: '100%',
          paddingBottom: '10px',
        }}
      >
        {parts.map((part: any, index: any) => (
          <span
            key={index}
            style={{
              fontWeight: part.highlight ? 700 : 400,
            }}
          >
            {part.text}
          </span>
        ))}
      </Box>
    </li>
  )
}
