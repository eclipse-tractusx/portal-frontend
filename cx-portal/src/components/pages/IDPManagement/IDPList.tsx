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

import {
  IdentityProvider,
  useEnableIDPMutation,
  useFetchIDPListQuery,
  useRemoveIDPMutation,
} from 'features/admin/idpApiSlice'
import { show } from 'features/control/overlay/actions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { OVERLAYS } from 'types/Constants'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton, CardTable } from 'cx-portal-shared-components'
import {
  updateData,
  updateIDPSelector,
  UPDATES,
} from 'features/control/updatesSlice'
import './style.scss'
import IDPDetailInfo from './IDPDetailsInfo'

// export const IDPListItem = ({ idp }: { idp: IdentityProvider }) => {
//   const { t } = useTranslation()
//   const dispatch = useDispatch()
//   const [removeIDP] = useRemoveIDPMutation()
//   const [enableIDP] = useEnableIDPMutation()
//   const state = idp.enabled ? 'enabled' : 'disabled'

//   const doDetails = () => dispatch(show(OVERLAYS.IDP, idp.identityProviderId))

//   const doDelete = async () => {
//     try {
//       await removeIDP(idp.identityProviderId)
//       dispatch(updateData(UPDATES.IDP_LIST))
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const doEnableToggle = async () => {
//     try {
//       await enableIDP({ id: idp.identityProviderId, enabled: !idp.enabled })
//       dispatch(updateData(UPDATES.IDP_LIST))
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className="idp-list-item">
//       <span className="category">{idp.identityProviderCategoryId}</span>
//       <span className="name">{idp.displayName || '-'}</span>
//       <span className="alias">{idp.alias}</span>
//       <span className={`state ${state}`} onClick={doEnableToggle}>
//         {t(`global.state.${state}`)}
//       </span>
//       <span className="action">
//         <IconButton color="secondary" onClick={doDetails}>
//           <ArrowForwardIcon />
//         </IconButton>
//         {idp.enabled || (
//           <IconButton color="secondary" onClick={doDelete}>
//             <DeleteForeverIcon />
//           </IconButton>
//         )}
//       </span>
//     </div>
//   )
// }

export const IDPList = () => {
  const update = useSelector(updateIDPSelector)
  const { data } = useFetchIDPListQuery(update)

  const updatedData = data
    ? data.map((info) => {
        return {
          ...info,
          body: <IDPDetailInfo id={info.identityProviderId}></IDPDetailInfo>,
        }
      })
    : []

  return (
    <CardTable
      row={updatedData as any}
      activeLabel="ENABLED"
      inactiveLabel="DISABLED"
    ></CardTable>
  )
}
