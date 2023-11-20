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

import { Outlet, useSearchParams } from 'react-router-dom'
import { Header } from './shared/frame/Header'
import { Footer } from './shared/frame/Footer'
import { useTranslation } from 'react-i18next'
import AccessService from '../services/AccessService'
import MainOverlay from './MainOverlay'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import { useEffect } from 'react'
import type { OVERLAYS } from 'types/Constants'
import './styles/main.scss'
import MainNotify from './MainNotify'
import MainSearchOverlay from './shared/frame/SearchOverlay'
import { MenuInfo } from './pages/Home/components/MenuInfo'

export default function Main() {
  document.title = useTranslation().t('title')
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const overlay = searchParams.get('overlay')?.split(':')
    overlay && dispatch(show(overlay[0] as OVERLAYS, overlay[1]))
  }, [dispatch, searchParams])

  return (
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
  )
}
