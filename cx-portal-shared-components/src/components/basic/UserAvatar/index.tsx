import { Badge, Avatar, AvatarProps, useTheme } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

interface AllAvatarProps extends Omit<AvatarProps, 'ImageComponent'> {
  altText?: string
  userImage?: string
  notificationCount?: number
  isNotificationAlert?: boolean
}

export const UserAvatar = ({
  userImage = '',
  altText = 'User avatar',
  notificationCount = 0,
  isNotificationAlert = false,
  ...props
}: AllAvatarProps) => {
  const theme = useTheme()
  const notificationColor = isNotificationAlert
    ? theme.palette.danger.dangerBadge
    : theme.palette.brand.brand02
  const userAvatarImage = userImage ? (
    <Avatar alt={altText} src={userImage} {...props} />
  ) : (
    <Avatar
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
      {...props}
    >
      <PersonOutlineIcon />
    </Avatar>
  )

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      badgeContent={notificationCount}
      sx={{
        '.MuiBadge-badge': {
          backgroundColor: notificationColor,
        },
      }}
    >
      {userAvatarImage}
    </Badge>
  )
}
