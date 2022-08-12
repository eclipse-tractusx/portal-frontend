import { Box } from '@mui/material'
import { Typography } from 'cx-portal-shared-components'
import { isValidElement, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface ValueItem {
  key: string
  value: string | number | JSX.Element
  copy?: boolean
}

interface KeyValueViewProps {
  cols: number
  title: string
  items: ValueItem | Array<ValueItem>
}

const renderValue = (value: string | number | JSX.Element) => (
  <Typography sx={{ color: 'gray', margin: 'auto 0px' }}>
    {isValidElement(value) ? value : value.toString()}
  </Typography>
)

export const KeyValueView = ({ cols, title, items }: KeyValueViewProps) => {
  const [copied, setCopied] = useState<string>('')

  const renderValueItem = (item: ValueItem) =>
    item.copy ? (
      <Box
        sx={{ cursor: 'pointer', display: 'flex' }}
        onClick={async () => {
          await navigator.clipboard.writeText(item.value.toString())
          setCopied(item.key)
        }}
      >
        {renderValue(item.value.toString())}
        <ContentCopyIcon
          sx={{
            color: copied === item.key ? '#00aa00' : 'lightgray',
            marginLeft: '10px',
          }}
        />
      </Box>
    ) : (
      renderValue(item.value)
    )

  return (
    <Box
      sx={{
        width: `${cols * 353 + (cols - 1) * 24}px`,
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
        {title}
      </Box>
      <Box>
        {Array.isArray(items) ? (
          items.map((item) => (
            <Box
              key={item.key}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '60px',
                padding: '18px 24px',
                borderBottom: '1px solid #EDF0F4',
              }}
            >
              <Box sx={{ fontWeight: 'bold' }}>{item.key}</Box>
              {renderValueItem(item)}
            </Box>
          ))
        ) : (
          <Box
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
