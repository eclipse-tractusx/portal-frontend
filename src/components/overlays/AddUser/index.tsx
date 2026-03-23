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

import {
  Button,
  CircleProgress,
  PageSnackbar,
} from '@arena2036/portal-shared-components-construct-x'
import {
  useFetchIDPListQuery,
  type IdentityProvider,
  IDPCategory,
} from 'features/admin/idpApiSlice'
import { AddUserContent } from './AddUserContent'
import { AddUserDeny } from './AddUserDeny'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { closeOverlay } from 'features/control/overlay'
import { useDispatch } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export const AddUser = () => {
  const { refetch, data, isFetching, isError } = useFetchIDPListQuery()
  const [idps, setIdps] = useState<IdentityProvider[]>([])
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    setIdps(data ? data.filter((idp: IdentityProvider) => idp.enabled) : [])
  }, [data])

  const renderAddUserContent = () => {
    return isError ? (
      <PageSnackbar
        open={isError}
        severity="error"
        description={
          <>
            {t('content.usermanagement.addUsers.error')}
            <Button
              size="small"
              sx={{ mt: 2, mb: 1, float: 'right' }}
              onClick={() => refetch()}
              endIcon={<ArrowForwardIcon />}
            >
              {t('error.tryAgain')}
            </Button>
          </>
        }
        showIcon={true}
        autoClose={false}
        onCloseNotification={() => dispatch(closeOverlay())}
      />
    ) : (
      renderAdduserMainContent()
    )
  }

  const renderAdduserMainContent = () => {
    return idps &&
      idps.filter(
        (idp) =>
          (idp.identityProviderTypeId === IDPCategory.SHARED ||
            idp.identityProviderTypeId === IDPCategory.OWN) &&
          idp.enabled
      ).length === 1 ? (
      <AddUserContent idp={idps[0]} />
    ) : (
      <AddUserDeny idps={idps} />
    )
  }

  return (
    <>
      {isFetching ? (
        <div
          style={{
            width: '100%',
            height: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircleProgress
            colorVariant="primary"
            size={80}
            thickness={8}
            variant="indeterminate"
          />
        </div>
      ) : (
        renderAddUserContent()
      )}
    </>
  )
}
