import { Box } from '@mui/material'
import { Typography } from 'cx-portal-shared-components'
import { isValidElement, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

type DataValue = string | number | JSX.Element

interface ValueItem {
  key?: DataValue
  value: DataValue
  copy?: boolean
}

interface KeyValueViewProps {
  cols: number
  title: string
  items: ValueItem | Array<ValueItem>
}

const renderValue = (value: DataValue) => (
  <Typography sx={{ fontSize: '14px', color: 'gray', margin: 'auto 0px' }}>
    {isValidElement(value) ? value : value.toString()}
  </Typography>
)

export const KeyValueView = ({ cols, title, items }: KeyValueViewProps) => {
  const [copied, setCopied] = useState<string>('')

  const renderValueItem = (item: ValueItem) =>
    item.copy ? (
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          color: copied === item.value ? '#00cc00' : '#eeeeee',
          ':hover': {
            color: copied === item.value ? '#00cc00' : '#cccccc',
          },
        }}
        onClick={async () => {
          await navigator.clipboard.writeText(item.value.toString())
          setCopied(item.value.toString())
          setTimeout(() => setCopied(''), 1000)
        }}
      >
        {renderValue(item.value.toString())}
        <ContentCopyIcon
          sx={{
            marginLeft: '10px',
          }}
        />
      </Box>
    ) : (
      <Box sx={{ marginRight: '34px', textAlign: 'right' }}>
        {renderValue(item.value)}
      </Box>
    )

  return (
    <Box
      sx={{
        width: `${cols * 353 + (cols - 1) * 31}px`,
        marginRight: '31px',
        marginBottom: '92px',
      }}
    >
      <Box
        sx={{
          height: '60px',
          width: '100%',
          backgroundColor: '#EDF0F4',
          padding: '18px 24px',
        }}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Box>
        {Array.isArray(items) ? (
          items.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: '60px',
                padding: '18px 24px',
                borderBottom: '1px solid #EDF0F4',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginRight: '20px',
                }}
              >
                {item.key}
              </Typography>
              {renderValueItem(item)}
            </Box>
          ))
        ) : (
          <Box
            key={items.value.toString()}
            sx={{
              padding: '18px 24px',
              borderBottom: '1px solid #EDF0F4',
            }}
          >
            {renderValueItem(items)}
          </Box>
        )}
      </Box>
    </Box>
  )
}
