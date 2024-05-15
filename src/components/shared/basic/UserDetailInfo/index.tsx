/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import type { TenantUserDetails } from 'features/admin/userApiSlice'
import { AppPermissions } from 'components/shared/frame/AppPermissions'
import { UserRoles } from '../UserRoles'
import type { KeycloakTokenParsed } from 'keycloak-js'

export const UserDetailInfo = ({
  user,
  parsedToken,
  isUserDetail,
}: {
  user: TenantUserDetails
  parsedToken?: KeycloakTokenParsed
  isUserDetail?: boolean
}) => {
  const { spacing } = useTheme()

  const userDetailsCards = userDetailsToCards(
    user,
    parsedToken ?? { organisation: '' }
  )
  const columns = 3

  return (
    <>
      <section>
        <Box
          sx={{
            display: 'grid',
            gap: spacing(8, 3),
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
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
      </section>
      <UserRoles user={user} isUserDetail={isUserDetail} />
      <section>
        <AppPermissions user={user} />
      </section>
    </>
  )
}
