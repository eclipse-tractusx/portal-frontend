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
import { MainHeader } from 'components/shared/cfx/MainHeader'
import { t } from 'i18next'

export default function CompanyData() {
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
    <>
      <main className="organization-main organization-main-page-container organization-main__bpx">
        <MainHeader
          title={t('content.companyData.pageHeader.title')}
          subTitle={t('content.companyData.pageHeader.description')}
          headerHeight={250}
          subTitleWidth={750}
        />
        <div className="organization-section ">
          <MyCompanyInfoComponent editable={false} />
        </div>
        <div className="bpx-section">
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
            description={t('content.companyData.site.description')}
            open={showOverlay.address || showOverlay.site}
            handleConfirm={() => {
              dispatch(setCompanyPageRefetch(true))
            }}
          />
        </div>
      </main>
    </>
  )
}
