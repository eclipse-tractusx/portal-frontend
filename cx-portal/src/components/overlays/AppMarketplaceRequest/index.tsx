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
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  useAddSubscribeAppMutation,
  useFetchAppDetailsQuery,
} from 'features/apps/apiSlice'
import { setSuccessType } from 'features/serviceMarketplace/slice'
import { closeOverlay } from 'features/control/overlay/actions'
import './AppMarketplaceRequest.scss'

export default function AppMarketplaceRequest({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { data } = useFetchAppDetailsQuery(id ?? '')
  const [addSubscribeApp, { isSuccess }] = useAddSubscribeAppMutation()

  if (isSuccess) {
    dispatch(setSuccessType(true))
    dispatch(closeOverlay())
  }

  const handleConfirm = async (id: string) => {
    try {
      addSubscribeApp(id).unwrap()
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <>
      <div className="subscription-overlay-header">
        <DialogHeader
          title={t('content.appMarketplace.headline')}
          intro={''}
          closeWithIcon={true}
          onCloseWithIcon={() => dispatch(closeOverlay())}
        />
      </div>

      <DialogContent className="app-overlay-content">
        <Typography className="app-description" variant="h5">
          {data &&
            t('content.appMarketplace.desc1').replace('{appName}', data.title)}
        </Typography>
        <Typography className="app-description" variant="h5">
          {data &&
            t('content.appMarketplace.desc2').replace('{appName}', data.title)}
        </Typography>
        <Typography className="app-description" variant="h5">
          {data &&
            t('content.appMarketplace.desc3').replace('{appName}', data.title)}
        </Typography>
        <Typography className="app-description" variant="h5">
          {data &&
            t('content.appMarketplace.desc4').replace('{appName}', data.title)}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button variant="contained" onClick={() => handleConfirm(id)}>
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
