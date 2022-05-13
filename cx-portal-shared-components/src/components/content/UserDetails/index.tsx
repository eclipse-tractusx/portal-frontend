import { Box, useTheme } from '@mui/material'
import { UserDetailCard, UserItems } from './UserDetailCard'
import uniqueId from 'lodash/uniqueId'

interface UserDetailsCards {
  action?: React.MouseEventHandler
  category: string
  items: UserItems
}

interface UserDetailsProps {
  userDetailsCards: UserDetailsCards[]
  columns?: number
}

export const UserDetails = ({
  userDetailsCards,
  columns = 6,
}: UserDetailsProps) => {
  const { spacing } = useTheme()

  return (
    <Box
      sx={{
        display: 'grid',
        gap: spacing(8, 3),
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {userDetailsCards.map((card) => (
        <UserDetailCard
          cardAction={card.action}
          cardCategory={card.category}
          cardContentItems={card.items}
          key={uniqueId('UserDetails')}
        />
      ))}
    </Box>
  )
}
