/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { CompanyAddressList } from './components/CompanyAddressList'
import { useState } from 'react'
import MyCompanyInfoComponent from '../Organization/MyCompanyInfoComponent'
import EditForm from './components/EditForm'
import { useDispatch } from 'react-redux'
import { setCompanyPageRefetch } from 'features/companyData/slice'
import { Button } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'

export default function CompanyData() {
  const { t } = useTranslation()
  const [showOverlay, setShowOverlay] = useState({
    address: false,
    site: false,
  })
  const dispatch = useDispatch()

  const updateOverlay = () => {
    setShowOverlay((old) => {
      old.address = false
      old.site = false
      return { ...old }
    })
  }

  return (
    <main className="organization-main">
      <div className="organization-section">
        <MyCompanyInfoComponent editable={false} />
        <div>
          <Button
            sx={{ margin: '-30px auto 30px auto', display: 'block' }}
            onClick={() => {
              dispatch(show(OVERLAYS.CSV_UPLOAD_OVERLAY))
            }}
          >
            {t('content.companyData.csvUploadBtn')}
          </Button>
        </div>
      </div>
      <CompanyAddressList
        handleButtonClick={() => {
          setShowOverlay((old) => {
            old.address = true
            return { ...old }
          })
        }}
        handleSecondButtonClick={() => {
          setShowOverlay((old) => {
            old.site = true
            return { ...old }
          })
        }}
        handleConfirm={() => {
          dispatch(setCompanyPageRefetch(true))
        }}
      />
      <EditForm
        newForm={true}
        isAddress={showOverlay.address}
        handleClose={() => {
          updateOverlay()
        }}
        open={showOverlay.address || showOverlay.site}
        handleConfirm={() => {
          dispatch(setCompanyPageRefetch(true))
        }}
      />
    </main>
  )
}
