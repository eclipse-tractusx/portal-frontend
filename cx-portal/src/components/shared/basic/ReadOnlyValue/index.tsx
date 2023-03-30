import { Box } from '@mui/material'
import { Typography, Tooltips } from 'cx-portal-shared-components'
import { IHashMap } from 'types/MainTypes'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useState } from 'react'

const CopyValue = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState<boolean>(false)

  return (
    <Box
      sx={{
        margin: '4px 0',
        cursor: 'pointer',
        display: 'flex',
        color: copied ? '#44aa44' : '#cccccc',
        ':hover': {
          color: copied ? '#44aa44' : '#888888',
        },
      }}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      }}
    >
      {value}
      <ContentCopyIcon
        sx={{
          marginLeft: '10px',
        }}
      />
    </Box>
  )
}

const ReadOnlyValue = ({
  label,
  tooltipMessage = '',
  value,
  style,
}: {
  label: string
  tooltipMessage?: string
  value: string
  style?: IHashMap<string>
}) => {
  return (
    <div style={style}>
      <div style={{ display: 'flex' }}>
        <Typography
          variant="label3"
          sx={{ textAlign: 'left', marginRight: '10px' }}
        >
          {label}
        </Typography>
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="top-start"
          tooltipText={tooltipMessage}
        >
          <div>
            <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
          </div>
        </Tooltips>
      </div>
      <CopyValue value={value} />
    </div>
  )
}

export default ReadOnlyValue
