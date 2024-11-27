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

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { CircleProgress, ErrorPage } from '@catena-x/portal-shared-components'
import { Header } from './shared/frame/Header'
import { useTranslation } from 'react-i18next'
import AccessService from '../services/AccessService'
import MainOverlay from './MainOverlay'
import { show } from 'features/control/overlay'
import { type OVERLAYS } from 'types/Constants'
import MainNotify from './MainNotify'
import MainSearchOverlay from './shared/frame/SearchOverlay'
import { MenuInfo } from './pages/Home/components/MenuInfo'
import {
  ApplicationStatus,
  ApplicationType,
  useFetchApplicationsQuery,
} from 'features/registration/registrationApiSlice'
import './styles/main.scss'
import RegistrationStatus from './pages/RegistrationStatus'
import Logout from './pages/Logout'
import Redirect from './actions/Redirect'
import { OSPConsent } from './pages/OSPConsent'
import { PAGES } from 'types/cfx/Constants'
import { Footer } from './shared/cfx/Footer'
import loadUserCentrics from 'utils/loadUserCentrics'

export default function Main() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  document.title = useTranslation().t('title')
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const { data, isLoading, error } = useFetchApplicationsQuery()
  const companyData = data?.[0]

  loadUserCentrics()

  const renderSection = () => {
    return companyData?.applicationType === ApplicationType.INTERNAL ? (
      <RegistrationStatus />
    ) : (
      <OSPConsent />
    )
  }

  useEffect(() => {
    const overlay = searchParams.get('overlay')?.split(':')
    overlay && dispatch(show(overlay[0] as OVERLAYS, overlay[1]))
  }, [dispatch, searchParams])

  if (location.pathname === `/${PAGES.REGISTRATION}`)
    return <Redirect path={PAGES.REGISTRATION} />

  if (
    companyData &&
    [
      ApplicationStatus.CREATED,
      ApplicationStatus.ADD_COMPANY_DATA,
      ApplicationStatus.INVITE_USER,
      ApplicationStatus.SELECT_COMPANY_ROLE,
      ApplicationStatus.UPLOAD_DOCUMENTS,
      ApplicationStatus.VERIFY,
    ].includes(companyData.applicationStatus) &&
    location.pathname !== `/${PAGES.CONSENT_OSP}`
  ) {
    return (
      <>
        <Header main={[]} user={AccessService.userMenuReg()} />
        <MainSearchOverlay />
        {location.pathname === `/${PAGES.LOGOUT}` ? (
          <Logout />
        ) : (
          renderSection()
        )}
        <Footer pages={AccessService.footerMenu()} />
        <MenuInfo main={[]} shouldDisplayMenuItems={false} />
      </>
    )
  } else if (
    companyData?.applicationStatus === ApplicationStatus.SUBMITTED &&
    location.pathname === `/${PAGES.CONSENT_OSP}`
  ) {
    return <Redirect path={PAGES.HOME} />
  }

  if (error)
    return (
      <ErrorPage
        header=""
        title={t('error.title')}
        description={t('error.description')}
        additionalDescription={t('error.additionalDescription')}
        reloadButtonTitle={t('error.reloadBtn')}
        onReloadClick={() => {
          navigate('/')
        }}
      />
    )

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <CircleProgress
            colorVariant="primary"
            size={80}
            thickness={8}
            variant="indeterminate"
          />
        </div>
      ) : (
        <>
          <Header
            main={AccessService.mainMenuTree()}
            user={AccessService.userMenu()}
          />
          <MainSearchOverlay />
          <div className="initial-main-div">
            <Outlet />
          </div>
          <Footer pages={AccessService.footerMenu()} />
          <MainOverlay />
          <MainNotify />
          <MenuInfo main={AccessService.mainMenuTree()} />
        </>
      )}
    </>
  )
}
