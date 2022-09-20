/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Badge, Avatar, AvatarProps, useTheme } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

interface AllAvatarProps extends Omit<AvatarProps, 'ImageComponent'> {
  altText?: string
  userImage?: string
  notificationCount?: number
  isNotificationAlert?: boolean
  size?: 'small' | 'large'
}

export const UserAvatar = ({
  userImage = '',
  altText = 'User avatar',
  notificationCount = 0,
  isNotificationAlert = false,
  size = 'small',
  ...props
}: AllAvatarProps) => {
  const theme = useTheme()
  const userAvatarSize = size === 'large' ? '80px' : '40px'

  const notificationColor = isNotificationAlert
    ? theme.palette.danger.dangerBadge
    : theme.palette.brand.brand02
  const userAvatarImage = userImage ? (
    <Avatar
      alt={altText}
      src={userImage}
      sx={{
        height: userAvatarSize,
        width: userAvatarSize,
      }}
      {...props}
    />
  ) : (
    <Avatar
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: userAvatarSize,
        width: userAvatarSize,
      }}
      {...props}
    >
      <PersonOutlineIcon
        sx={{
          height: Number(userAvatarSize.replace(/px/g, '')) / 2 + 'px',
          width: Number(userAvatarSize.replace(/px/g, '')) / 2 + 'px',
        }}
      />
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
