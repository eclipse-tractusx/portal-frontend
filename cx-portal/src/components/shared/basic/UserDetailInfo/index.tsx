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

import { Box, useTheme } from '@mui/material'
import { UserDetailCard } from './UserDetailCard'
import { userDetailsToCards } from 'features/admin/userOwn/mapper'
import { TenantUserDetails } from 'features/admin/userApiSlice'
import { AppPermissions } from 'components/shared/frame/AppPermissions'

export const UserDetailInfo = ({ user }: { user: TenantUserDetails }) => {
  const { spacing } = useTheme()

  const userDetailsCards = userDetailsToCards(user)
  const columns = 3

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: spacing(8, 3),
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          marginBottom: '80px',
        }}
      >
        {userDetailsCards.map((card, i) => (
          <UserDetailCard
            cardCategory={card.cardCategory}
            cardContentItems={card.cardContentItems}
            key={i}
          />
        ))}
      </Box>
      <AppPermissions user={user} />
    </>
  )
}
