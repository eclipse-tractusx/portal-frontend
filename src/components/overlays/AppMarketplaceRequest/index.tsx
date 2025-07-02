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
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
  Typography,
  Checkbox,
  OrderStatusButton,
  paletteDefinitions,
} from '@cofinity-x/shared-components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import {
  useAddSubscribeAppMutation,
  useFetchAgreementsQuery,
} from 'features/apps/apiSlice'
import { closeOverlay } from 'features/control/overlay'
import './style.scss'
import { error } from 'services/NotifyService'
import { AgreementStatus } from '../UpdateCompanyRole'
import { type AgreementRequest } from 'features/apps/types'
import { confirmDialog } from 'features/overlay/slice'

export default function AppMarketplaceRequest({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data: agreements } = useFetchAgreementsQuery(id ?? '')
  const [addSubscribeApp] = useAddSubscribeAppMutation()

  const [checkedAgreementsIds, setCheckedAgreementsIds] = useState<string[]>([])
  const [subscriptionOverlay, setSubscriptionOverlay] = useState<boolean>(true)
  const [successOverlay, setSuccessOverlay] = useState<boolean>(false)

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
        .then(() => {
          setSuccessOverlay(true)
          setSubscriptionOverlay(false)
          dispatch(confirmDialog())
        })
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

      {subscriptionOverlay && (
        <>
          <DialogContent className="app-overlay-content">
            <Typography variant="body2" sx={{ mb: '20px' }}>
              {t('content.appMarketplace.desc1')}
            </Typography>
            <Typography variant="body2" sx={{ mb: '20px' }}>
              {t('content.appMarketplace.desc2')}
            </Typography>
            <Typography variant="h5">
              {t('content.appMarketplace.desc3')}
            </Typography>
            <Typography variant="body2" sx={{ mb: '20px' }}>
              {t('content.appMarketplace.desc4')}
            </Typography>
            <Typography variant="h5">
              {t('content.appMarketplace.termsHeading')}
            </Typography>
            {agreements && agreements.length > 0 ? (
              <ul className="agreements-list">
                {agreements?.map((agreement, index) => (
                  <li key={index}>
                    <Checkbox
                      label={`${agreement.name} ${agreement.mandatory ? ' *' : ''} `}
                      onChange={(e) => {
                        handleCheckedAgreement(e.target.checked, agreement)
                      }}
                      onFocusVisible={function noRefCheck() {
                        // do nothing
                      }}
                      size="small"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2" sx={{ mb: '20px' }}>
                {t('content.appMarketplace.noTermsAvailable')}
              </Typography>
            )}
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
              {t('global.actions.cancel')}
            </Button>
            <Button
              variant="contained"
              onClick={() => handleConfirmApp(id)}
              disabled={
                agreements && agreements.length > 0
                  ? !agreements
                      ?.filter((data) => data.mandatory && data.agreementId)
                      .map((item) => item.agreementId)
                      .every((value) => checkedAgreementsIds.includes(value))
                  : false
              }
            >
              {t('global.actions.confirm')}
            </Button>
          </DialogActions>
        </>
      )}
      {successOverlay && (
        <>
          <DialogContent className="app-overlay-content">
            <Typography variant="body2" sx={{ mb: '20px' }}>
              {t('content.appMarketplace.desc5')}
            </Typography>
            <Typography variant="body2">
              {t('content.appMarketplace.desc6')}
            </Typography>
            <Typography variant="body2" sx={{ mb: '20px' }}>
              {t('content.appMarketplace.desc7')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {t('content.appMarketplace.statusHeading')}
            </Typography>
            <OrderStatusButton
              color={'primary'}
              label={t('content.appdetail.subscribe')}
              buttonData={OrderStatusButtonData}
              selectable={false}
            />
            <Typography variant="body2" sx={{ mt: 3, mb: '20px' }}>
              {t('content.appMarketplace.desc8')}
            </Typography>
            <Typography variant="body2" sx={{ mb: '20px' }}>
              {t('content.appMarketplace.desc9')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
              {t('global.actions.close')}
            </Button>
          </DialogActions>{' '}
        </>
      )}
    </>
  )
}
