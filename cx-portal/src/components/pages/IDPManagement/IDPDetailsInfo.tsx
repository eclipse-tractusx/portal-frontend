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
  const { data, refetch } = useFetchIDPDetailQuery(id)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const formData = useSelector(editIDPSelector)
  const [updateIDP] = useUpdateIDPMutation()

  const {
    displayName,
    metadataUrl,
    clientAuthMethod,
    clientId,
    secret,
    signatureAlgorithm,
  } = formData

  const submitForm = async () => {
    if (!formData) return
    const update: IdentityProviderUpdate = {
      identityProviderId: id,
      body: {
        displayName: displayName,
        oidc: {
          clientId: clientId,
          secret: secret,
          signatureAlgorithm: signatureAlgorithm,
          metadataUrl: metadataUrl,
          clientAuthMethod: clientAuthMethod,
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

  useEffect(() => refetch(), [refetch])

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
