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

import IDPDetailContent from 'components/pages/IDPDetail/IDPDetailContent'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import {
  IdentityProviderUpdate,
  useFetchIDPDetailQuery,
  useUpdateIDPMutation,
} from 'features/admin/idpApiSlice'
import { editIDPSelector } from 'features/control/formSlice'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function IDPDetailForm({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data, refetch } = useFetchIDPDetailQuery(id)
  const [updateIDP] = useUpdateIDPMutation()
  const formData = useSelector(editIDPSelector)

  useEffect(() => refetch(), [refetch])

  const submitForm = async () => {
    if (!formData) return
    const update: IdentityProviderUpdate = {
      identityProviderId: id,
      body: {
        displayName: formData.displayName,
        oidc: {
          metadataUrl: formData.metadataUrl,
          clientAuthMethod: formData.clientAuthMethod,
          clientId: formData.clientId,
          secret: formData.secret,
          signatureAlgorithm: formData.signatureAlgorithm,
        },
      },
    }
    try {
      await updateIDP(update).unwrap()
      dispatch(updateData(UPDATES.IDP_LIST))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.idpdetail.title'),
        }}
      />

      <DialogContent>{data && <IDPDetailContent idp={data} />}</DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={submitForm}>
          {`${t('global.actions.save')}`}
        </Button>
      </DialogActions>
    </>
  )
}
