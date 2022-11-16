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
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import {
  AgreementRequest,
  useAddSubscribeAppMutation,
  useFetchAgreementsQuery,
  useFetchAppDetailsQuery,
} from 'features/apps/apiSlice'
import { setSuccessType } from 'features/serviceMarketplace/slice'
import { closeOverlay } from 'features/control/overlay/actions'
import './AppMarketplaceRequest.scss'

export default function AppMarketplaceRequest({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { data } = useFetchAppDetailsQuery(id ?? '')
  const { data: agreements } = useFetchAgreementsQuery(id ?? '')
  const [addSubscribeApp, { isSuccess }] = useAddSubscribeAppMutation()

  const [checkedAgreementsIds, setCheckedAgreementsIds] = useState<string[]>([])

  if (isSuccess) {
    dispatch(setSuccessType(true))
    dispatch(closeOverlay())
  }

  const handleConfirmApp = async (id: string) => {
    try {
      const data = agreements?.map((agreement) => {
        return {
          agreementId: agreement.agreementId,
          consentStatusId:
            checkedAgreementsIds.indexOf(agreement.agreementId) >= 0
              ? 'ACTIVE'
              : 'INACTIVE',
        }
      })
      data && addSubscribeApp({ appId: id, body: data }).unwrap()
    } catch (err) {
      console.log('error', err)
    }
  }

  const handleCheckedAgreement = (
    checked: boolean,
    agreement: AgreementRequest
  ) => {
    if (checked) {
      checkedAgreementsIds.indexOf(agreement.agreementId) <= 0 &&
        setCheckedAgreementsIds([
          ...checkedAgreementsIds,
          agreement.agreementId,
        ])
    } else {
      const index =
        checkedAgreementsIds &&
        checkedAgreementsIds.indexOf(agreement.agreementId)
      if (index > -1) {
        checkedAgreementsIds.splice(index, 1)
        setCheckedAgreementsIds([...checkedAgreementsIds])
      }
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
        <ul className="agreements-list">
          {agreements &&
            agreements.map((agreement, index) => (
              <li key={index}>
                <Checkbox
                  label={agreement.name}
                  onChange={(e) =>
                    handleCheckedAgreement(e.target.checked, agreement)
                  }
                  onFocusVisible={function noRefCheck() {}}
                />
              </li>
            ))}
        </ul>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleConfirmApp(id)}
          disabled={
            checkedAgreementsIds.length > 0 ||
            (agreements && agreements.length <= 0)
              ? false
              : true
          }
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
