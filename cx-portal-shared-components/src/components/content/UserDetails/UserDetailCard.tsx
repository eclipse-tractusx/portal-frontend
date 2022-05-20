import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, List, ListItem } from '@mui/material'
import { IconButton } from '../../basic/IconButton'
import { Typography } from '../../basic/Typography'
import { Chip } from '../../basic/Chip'

interface UserCardProps {
  cardAction?: React.MouseEventHandler
  cardCategory: string
  cardContentItems: UserItems
}

interface UserItemsTranslation {
  label: string
  value: string
}

export interface UserItems {
  [key: string]: UserItemsTranslation | undefined
}

export const UserDetailCard = ({
  cardAction,
  cardCategory,
  cardContentItems,
}: UserCardProps) => {
  const renderContentSwitch = (
    param: string,
    value: UserItemsTranslation | undefined
  ) => {
    switch (param) {
    case 'status':
      return (
        <>
          <span style={{ marginRight: '10px' }}>{value?.label} :</span>
          <Chip
            color="secondary"
            label={value?.value}
            type="confirm"
            variant="filled"
            withIcon={false}
          />
        </>
      )
    default:
      return `${value?.label}: ${value?.value}`
    }
  }
  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.background09',
          display: 'flex',
          height: '55px',
          paddingLeft: '20px',
          paddingRight: '14px',
        }}
      >
        <Typography variant="label3">{cardCategory}</Typography>
        {cardAction && (
          <IconButton
            color="secondary"
            sx={{ marginLeft: 'auto' }}
            onClick={cardAction}
          >
            <EditOutlinedIcon />
          </IconButton>
        )}
      </Box>
      <List>
        {Object.entries(cardContentItems).map(([k, v], i) => (
          <ListItem
            key={i}
            disableGutters
            sx={{
              borderBottom: '1px solid',
              borderColor: 'border.border01',
              color: 'text.tertiary',
              fontFamily: 'LibreFranklin-Light',
              padding: k === 'status' ? '12.5px' : '20px',
            }}
          >
            {renderContentSwitch(k, v)}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
