/********************************************************************************
 * 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { BpdmTypeUUIDKeyPair } from 'features/partnerNetwork/types'
import DetailGridRow from './DetailGridRow'
import { BusinessPartnerSearchResponse } from 'features/newPartnerNetwork/types'
import GridTitle from './GridTitle'
import DialogContainer from './DailogContainer'

interface BusinessPartnerDetailOverlayProps {
  openDialog?: boolean
  selectedRowBPN: BusinessPartnerSearchResponse
  handleOverlayClose: React.MouseEventHandler
}

const BusinessPartnerDetailOverlay = ({
  openDialog = false,
  selectedRowBPN,
  handleOverlayClose,
}: BusinessPartnerDetailOverlayProps) => {
  const { t } = useTranslation()

  return (
    <div className={'business-partner-overlay'}>
      <DialogContainer
        handleOverlayClose={handleOverlayClose}
        openDialog={openDialog}
        dialogHeaderTitle={t('content.partnernetwork.overlay.title')}
      >
        <>
          <GridTitle
            title={t('content.partnernetwork.overlay.companydatatitle')}
          />
          <DetailGridRow
            key={t('content.partnernetwork.columns.name') as string}
            {...{
              variableName: `${t('content.partnernetwork.columns.name')}`,
              value: selectedRowBPN.legalEntity
                ? selectedRowBPN.legalEntity.names[0].value
                : '',
            }}
          />
          <DetailGridRow
            key={t('content.partnernetwork.columns.bpn') as string}
            {...{
              variableName: `${t('content.partnernetwork.columns.bpn')}`,
              value: selectedRowBPN.legalEntity
                ? selectedRowBPN.legalEntity.bpn
                : '',
            }}
          />

          {/* {selectedRowBPN.legalForm && (
                <DetailGridRow
                  key={t('content.partnernetwork.overlay.legalform') as string}
                  {...{
                    variableName: `${t(
                      'content.partnernetwork.overlay.legalform'
                    )}`,
                    value: selectedRowBPN.legalForm,
                  }}
                />
              )} */}
          <GridTitle title={t('content.partnernetwork.columns.address')} />
          {/* <DetailGridRow
                key="Street"
                {...{ variableName: 'Street', value: selectedRowBPN.street }}
              />
              <DetailGridRow
                key="PLZ / City"
                {...{
                  variableName: 'PLZ / City',
                  value: `${selectedRowBPN.zipCode} ${selectedRowBPN.city}`,
                }}
              /> */}
          <DetailGridRow
            key="Country"
            {...{
              variableName: t('content.partnernetwork.columns.address'),
              value: selectedRowBPN.legalEntity
                ? selectedRowBPN.legalEntity.legalAddress.country.name
                : '',
            }}
          />
          <GridTitle title={t('content.partnernetwork.columns.identifiers')} />
          {selectedRowBPN.legalEntity &&
            selectedRowBPN.legalEntity.identifiers?.map(
              (identifier: BpdmTypeUUIDKeyPair) => {
                return (
                  <DetailGridRow
                    key={identifier.type?.name}
                    {...{
                      variableName:
                        identifier.type?.name || identifier.type?.technicalKey,
                      value: identifier.value,
                    }}
                  />
                )
              }
            )}
        </>
      </DialogContainer>
    </div>
  )
}

export default BusinessPartnerDetailOverlay
