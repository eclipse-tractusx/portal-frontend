/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import {
  useFetchIDPDetailQuery,
  useRemoveIDPMutation,
} from 'features/admin/idpApiSlice'
import DeleteObjectContent from 'components/shared/basic/DeleteObjectContent'
import { error, success } from 'services/NotifyService'

export const OSPDelete = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const ti = useTranslation('osp').t
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id ?? '')
  const [removeIDP] = useRemoveIDPMutation()

  const handleRemove = async () => {
    if (!data) return
    try {
      await removeIDP(data.identityProviderId).unwrap()
      success(ti('delete.success'))
    } catch (err) {
      error(ti('delete.error'), '', err as object)
    }
    setTimeout(() => dispatch(closeOverlay()), 3000)
  }

  return data ? (
    <DeleteObjectContent
      header={`${t('global.actions.delete')} ${t('global.objects.osp')} ${
        data.displayName
      }`}
      subHeader={t('global.actions.confirmDelete', {
        object: t('global.objects.osp'),
        name: data.displayName,
      })}
      subHeaderTitle={t('global.actions.noteDelete', {
        object: t('global.objects.osp'),
      })}
      handleConfirm={handleRemove}
      confirmTitle={t('global.actions.delete')}
    />
  ) : null
}
