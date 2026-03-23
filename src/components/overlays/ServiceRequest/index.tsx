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
} from '@arena2036/portal-shared-components-construct-x'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  type AgreementRequest,
  useAddSubscribeServiceMutation,
  useFetchAgreementsQuery,
} from 'features/serviceMarketplace/serviceApiSlice'
import { closeOverlay } from 'features/control/overlay'
import './style.scss'
import { error } from 'services/NotifyService'
import { AgreementStatus } from '../UpdateCompanyRole'

export default function ServiceRequest({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [selectedAgreementsIds, setSelectedAgreementsIds] = useState<string[]>(
    []
  )
  const { data: serviceAgreements } = useFetchAgreementsQuery(id ?? '')
  const [addSubscribeService] = useAddSubscribeServiceMutation()
  const [serviceSubscriptionOverlay, setServiceSubscriptionOverlay] =
    useState<boolean>(true)
  const [serviceSuccessOverlay, setServiceSuccessOverlay] =
    useState<boolean>(false)

  const handleConfirmService = async (id: string) => {
    const subscriptionData = serviceAgreements?.map((agreement) => {
      return {
        agreementId: agreement.agreementId,
        consentStatusId: selectedAgreementsIds.includes(agreement.agreementId)
          ? AgreementStatus.ACTIVE
          : AgreementStatus.INACTIVE,
      }
    })
    subscriptionData &&
      (await addSubscribeService({ serviceId: id, body: subscriptionData })
        .unwrap()
        .then(() => {
          setServiceSuccessOverlay(true)
          setServiceSubscriptionOverlay(false)
        })
        .catch((err) => {
          error(t('content.serviceMarketplace.errorMessage'), '', err as object)
        }))
  }

  const handleSelectedAgreement = (
    checked: boolean,
    agreement: AgreementRequest
  ) => {
    if (checked) {
      selectedAgreementsIds.indexOf(agreement.agreementId) <= 0 &&
        setSelectedAgreementsIds([
          ...selectedAgreementsIds,
          agreement.agreementId,
        ])
    } else {
      const index = selectedAgreementsIds?.indexOf(agreement.agreementId)
      if (index > -1) {
        selectedAgreementsIds.splice(index, 1)
        setSelectedAgreementsIds([...selectedAgreementsIds])
      }
    }
  }

  return (
    <>
      <div className="subscription-overlay-header">
        <DialogHeader
          title={t('content.serviceMarketplace.headline')}
          intro={''}
          onCloseWithIcon={() => dispatch(closeOverlay())}
          closeWithIcon={true}
        />
      </div>

      {serviceSubscriptionOverlay && (
        <>
          <DialogContent className="marketplace-overlay-content">
            <Typography sx={{ mb: '20px' }} variant="body2">
              {t('content.serviceMarketplace.desc1')}
            </Typography>
            <Typography sx={{ mb: '20px' }} variant="body2">
              {t('content.serviceMarketplace.desc2')}
            </Typography>
            <Typography variant="h5">
              {t('content.serviceMarketplace.desc3')}
            </Typography>
            <Typography sx={{ mb: '20px' }} variant="body2">
              {t('content.serviceMarketplace.desc4')}
            </Typography>
            <Typography variant="h5">
              {t('content.serviceMarketplace.termsHeading')}
            </Typography>
            {serviceAgreements && serviceAgreements.length > 0 ? (
              <ul className="agreements-list">
                {serviceAgreements?.map((agreement, index) => (
                  <li key={index}>
                    <Checkbox
                      onChange={(e) => {
                        handleSelectedAgreement(e.target.checked, agreement)
                      }}
                      label={`${agreement.name} ${agreement.mandatory ? ' *' : ''} `}
                      size="small"
                      onFocusVisible={function noRefCheck() {
                        // do nothing
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Typography sx={{ mb: '20px' }} variant="body2">
                {t('content.serviceMarketplace.noTermsAvailable')}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeOverlay())} variant="outlined">
              {t('global.actions.cancel')}
            </Button>
            <Button
              onClick={() => handleConfirmService(id)}
              variant="contained"
              disabled={
                serviceAgreements && serviceAgreements.length > 0
                  ? !serviceAgreements
                      ?.filter((data) => data.mandatory && data.agreementId)
                      .map((item) => item.agreementId)
                      .every((value) => selectedAgreementsIds.includes(value))
                  : false
              }
            >
              {t('global.actions.confirm')}
            </Button>
          </DialogActions>
        </>
      )}
      {serviceSuccessOverlay && (
        <>
          <DialogContent className="marketplace-overlay-content">
            <Typography sx={{ mb: '20px' }} variant="body2">
              {t('content.serviceMarketplace.desc5')}
            </Typography>
            <Typography variant="body2">
              {t('content.serviceMarketplace.desc6')}
            </Typography>
            <Typography sx={{ mb: '20px' }} variant="body2">
              {t('content.serviceMarketplace.desc7')}
            </Typography>
            <Typography variant="body2" sx={{ mb: '20px', mt: 3 }}>
              {t('content.serviceMarketplace.desc8')}
            </Typography>
            <Typography sx={{ mb: '20px' }} variant="body2">
              {t('content.serviceMarketplace.desc9')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeOverlay())} variant="outlined">
              {t('global.actions.close')}
            </Button>
          </DialogActions>
        </>
      )}
    </>
  )
}
