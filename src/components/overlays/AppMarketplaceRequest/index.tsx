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
import {
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
  Typography,
  Checkbox,
  OrderStatusButton,
  paletteDefinitions,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import {
  useAddSubscribeAppMutation,
  useFetchAgreementsQuery,
  useFetchAppDetailsQuery,
} from 'features/apps/apiSlice'
import { setSuccessType } from 'features/serviceMarketplace/slice'
import { closeOverlay } from 'features/control/overlay'
import './AppMarketplaceRequest.scss'
import { error } from 'services/NotifyService'
import { AgreementStatus } from '../UpdateCompanyRole'
import type { AgreementRequest } from 'features/apps/types'

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

  const OrderStatusButtonData = [
    {
      isIcon: false,
      buttonLabel: t('content.appdetail.buttons.subscribtionInit'),
      zIndex: 4,
      backgroundColor: paletteDefinitions.buttons.darkGrey ?? '',
    },
    {
      isIcon: false,
      buttonLabel: t('content.appdetail.buttons.appDeployed'),
      zIndex: 3,
      backgroundColor: paletteDefinitions.buttons.lightGrey ?? '',
    },
    {
      isIcon: false,
      buttonLabel: t('content.appdetail.buttons.activation'),
      zIndex: 2,
      backgroundColor: paletteDefinitions.buttons.white ?? '',
    },
  ]

  const handleConfirmApp = async (id: string) => {
    const data = agreements?.map((agreement) => {
      return {
        agreementId: agreement.agreementId,
        consentStatusId: checkedAgreementsIds.includes(agreement.agreementId)
          ? AgreementStatus.ACTIVE
          : AgreementStatus.INACTIVE,
      }
    })
    data &&
      (await addSubscribeApp({ appId: id, body: data })
        .unwrap()
        .catch((err) => {
          error(t('content.appMarketplace.errorMessage'), '', err as object)
        }))
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
      const index = checkedAgreementsIds?.indexOf(agreement.agreementId)
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
        <Typography className="app-description" variant="body1">
          {data &&
            t('content.appMarketplace.desc2').replace('{appName}', data.title)}
        </Typography>
        <Typography className="app-description" variant="body1">
          {data &&
            t('content.appMarketplace.desc3').replace('{appName}', data.title)}
        </Typography>
        <Typography className="app-description" variant="body1">
          {data &&
            t('content.appMarketplace.desc4').replace('{appName}', data.title)}
        </Typography>
        <ul className="agreements-list">
          {agreements?.map((agreement, index) => (
            <li key={index}>
              <Checkbox
                label={agreement.name}
                onChange={(e) => {
                  handleCheckedAgreement(e.target.checked, agreement)
                }}
                onFocusVisible={function noRefCheck() {
                  // do nothing
                }}
              />
            </li>
          ))}
        </ul>
        <Typography variant="body2" sx={{ marginBottom: '15px' }}>
          {t('content.appMarketplace.statusHeading')}
        </Typography>
        <OrderStatusButton
          color={'primary'}
          label={t('content.appdetail.subscribe')}
          buttonData={OrderStatusButtonData}
          selectable={false}
        />
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
