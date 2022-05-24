import uniqueId from 'lodash/uniqueId'
import { Box, useTheme } from '@mui/material'
import { UserCardProps, UserDetailCard } from './UserDetailCard'

interface UserDetailsProps {
  columns?: number
  userDetailsCards: UserCardProps[]
}

export const UserDetails = ({
  columns = 6,
  userDetailsCards,
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
          cardAction={card.cardAction}
          cardCategory={card.cardCategory}
          cardContentItems={card.cardContentItems}
          key={uniqueId('UserDetails')}
        />
      ))}
    </Box>
  )
}
