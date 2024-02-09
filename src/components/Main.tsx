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

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useSearchParams } from 'react-router-dom'
import { CircleProgress } from '@catena-x/portal-shared-components'
import { Header } from './shared/frame/Header'
import { Footer } from './shared/frame/Footer'
import { useTranslation } from 'react-i18next'
import AccessService from '../services/AccessService'
import MainOverlay from './MainOverlay'
import { show } from 'features/control/overlay'
import { OVERLAYS, PAGES } from 'types/Constants'
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

export default function Main() {
  document.title = useTranslation().t('title')
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const { data, isLoading } = useFetchApplicationsQuery()
  const companyData = data?.[0]

  useEffect(() => {
    const overlay = searchParams.get('overlay')?.split(':')
    overlay && dispatch(show(overlay[0] as OVERLAYS, overlay[1]))
  }, [dispatch, searchParams])

  if (location.pathname === `/${PAGES.REGISTRATION}`)
    return <Redirect path="registration" />

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
    !location.search.includes('overlay=consent_osp')
  ) {
    if (companyData.applicationType === ApplicationType.INTERNAL) {
      return (
        <>
          <Header main={[]} user={AccessService.userMenuReg()} />
          <MainSearchOverlay />
          {window.location.pathname === '/logout' ? (
            <Logout />
          ) : (
            <RegistrationStatus />
          )}
          <Footer pages={AccessService.footerMenu()} />
          <MenuInfo main={[]} />
        </>
      )
    } else dispatch(show(OVERLAYS.CONSENT_OSP))
  }

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
          <Outlet />
          <Footer pages={AccessService.footerMenu()} />
          <MainOverlay />
          <MainNotify />
          <MenuInfo main={AccessService.mainMenuTree()} />
        </>
      )}
    </>
  )
}
