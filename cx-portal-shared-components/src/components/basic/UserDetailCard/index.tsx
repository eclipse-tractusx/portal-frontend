import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, List, ListItem } from '@mui/material'
import { IconButton } from '../IconButton'
import { Typography } from '../Typography'

export interface UserCardProps {
  cardAction?: React.MouseEventHandler
  cardCategory: string
  cardContentItems: UserItems
}

export interface UserItems {
  [key: string]: string
}

export const UserDetailCard = ({
  cardAction,
  cardCategory,
  cardContentItems,
}: UserCardProps) => {
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
              padding: '20px',
            }}
          >
            {k}: {v}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
