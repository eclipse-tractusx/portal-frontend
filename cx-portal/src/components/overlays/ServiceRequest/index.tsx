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
import {
  AgreementRequest,
  useAddSubscribeServiceMutation,
  useFetchAgreementsQuery,
  useFetchServiceQuery,
} from 'features/serviceMarketplace/serviceApiSlice'
import { setSuccessType } from 'features/serviceMarketplace/slice'
import { closeOverlay } from 'features/control/overlay/actions'
import './ServiceRequest.scss'

export default function ServiceRequest({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [selectedAgreementsIds, setSelectedAgreementsIds] = useState<string[]>(
    []
  )

  const { data } = useFetchServiceQuery(id ?? '')
  const { data: serviceAgreements } = useFetchAgreementsQuery(id ?? '')
  const [addSubscribeService, { isSuccess }] = useAddSubscribeServiceMutation()

  if (isSuccess) {
    dispatch(setSuccessType(true))
    dispatch(closeOverlay())
  }

  const handleConfirmService = async (id: string) => {
    try {
      const subscriptionData = serviceAgreements?.map((agreement) => {
        return {
          agreementId: agreement.agreementId,
          consentStatusId:
            selectedAgreementsIds.indexOf(agreement.agreementId) >= 0
              ? 'ACTIVE'
              : 'INACTIVE',
        }
      })
      subscriptionData &&
        addSubscribeService({ serviceId: id, body: subscriptionData }).unwrap()
    } catch (err) {
      console.log('error', err)
    }
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
      const index =
        selectedAgreementsIds &&
        selectedAgreementsIds.indexOf(agreement.agreementId)
      if (index > -1) {
        selectedAgreementsIds.splice(index, 1)
        setSelectedAgreementsIds([...selectedAgreementsIds])
      }
    }
  }

  return (
    <>
      <DialogHeader
        title={t('content.serviceMarketplace.headline')}
        intro={''}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />

      <DialogContent className="marketplace-overlay-content">
        <Typography className="service-description" variant="h5">
          {data &&
            t('content.serviceMarketplace.description').replace(
              '{serviceName}',
              data.title
            )}
        </Typography>
        <ul className="agreements-list">
          {serviceAgreements &&
            serviceAgreements.map((agreement, index) => (
              <li key={index}>
                <Checkbox
                  label={agreement.name}
                  onChange={(e) =>
                    handleSelectedAgreement(e.target.checked, agreement)
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
          onClick={() => handleConfirmService(id)}
          disabled={
            selectedAgreementsIds.length > 0 ||
            (serviceAgreements && serviceAgreements.length <= 0)
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
