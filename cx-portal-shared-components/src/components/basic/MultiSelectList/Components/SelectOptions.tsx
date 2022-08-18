import { Box } from '@mui/material'
import { HTMLAttributes } from 'react'
import { PartsType } from '..'

interface SelectOptionsProps {
  props: HTMLAttributes<HTMLElement>
  parts: PartsType[]
}

export const SelectOptions = ({ props, parts }: SelectOptionsProps) => (
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
      {parts.map((part: PartsType, index: number) => (
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
