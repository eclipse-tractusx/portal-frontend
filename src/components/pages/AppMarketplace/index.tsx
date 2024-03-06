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

import StageSection from './components/StageSection'
import AppListSection from './components/AppListSection'
import SearchSection from './components/SearchSection'
import HeaderSection from './components/HeaderSection'
import { Box } from '@mui/material'
import PageService from 'services/PageService'
import { useRef } from 'react'
import './AppMarketplace.scss'

export default function AppMarketplace() {
  const reference = PageService.registerReference('AppList', useRef(null))

  return (
    <main className="app-store">
      <StageSection />
      <Box ref={reference} className="overview-section">
        <HeaderSection />
        <SearchSection />
        <AppListSection />
      </Box>
    </main>
  )
}
