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
  Checkbox,
} from 'cx-portal-shared-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import {
  useAddSubscribeServiceMutation,
  useFetchServiceQuery,
} from 'features/serviceMarketplace/serviceApiSlice'
import { setSuccessType } from 'features/serviceMarketplace/slice'

export default function ServiceRequest({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [termsChecked, setTermsChecked] = useState<boolean>(false)

  const { data } = useFetchServiceQuery(id ?? '')
  const [addSubscribeService, { isSuccess }] = useAddSubscribeServiceMutation()

  if (isSuccess) {
    dispatch(setSuccessType(true))
    dispatch(show(OVERLAYS.NONE, ''))
  }

  const handleConfirm = async (id: string) => {
    try {
      addSubscribeService(id).unwrap()
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <>
      <DialogHeader
        title={t('content.serviceMarketplace.headline')}
        intro={''}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(show(OVERLAYS.NONE, ''))}
      />

      <DialogContent className="marketplace-overlay-content">
        <Typography
          sx={{ margin: '30px 0 10px', textAlign: 'center' }}
          variant="h5"
        >
          {data &&
            t('content.serviceMarketplace.description').replace(
              '{serviceName}',
              data.title
            )}
        </Typography>
        <Checkbox
          label="Terms & Conditions"
          onChange={(e) => {
            setTermsChecked(e.target.checked)
          }}
          onFocusVisible={function noRefCheck() {}}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE))}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleConfirm(id)}
          disabled={termsChecked ? false : true}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
