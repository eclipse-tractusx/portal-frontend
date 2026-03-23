/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
  DialogContent,
  DialogHeader,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import AppOverViewDetails from 'components/pages/AppOverview/AppOverViewDetails'
import { closeOverlay } from 'features/control/overlay'
import { useFetchAppStatusQuery } from 'features/appManagement/apiSlice'
import { useDispatch } from 'react-redux'

export default function AppDetailsOverlay({
  id,
  title,
}: {
  id: string
  title?: string
}) {
  const { t } = useTranslation()
  const { data } = useFetchAppStatusQuery(id)
  const dispatch = useDispatch()

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.appOverview.details.title'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(closeOverlay()),
        }}
      />

      <DialogContent
        sx={{
          width: '90%',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        {title && (
          <Typography
            sx={{
              marginBottom: '40px',
            }}
            variant="h5"
          >
            {t('content.appOverview.details.description').replace(
              '{appName}',
              title
            )}
          </Typography>
        )}
        {data && <AppOverViewDetails item={data} id={id} />}
      </DialogContent>
    </>
  )
}
