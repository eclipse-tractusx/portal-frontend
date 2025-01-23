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

import Main from 'components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from 'components/pages/NotFound'
import AccessService from 'services/AccessService'
import ScrollToTop from '../utils/ScrollToTop'
import ErrorBoundary from 'components/pages/ErrorBoundary'
import DeleteCompany from './pages/DeleteCompany'
import { useSelector } from 'react-redux'
import { companySelector } from 'features/companyAccess/slice'

const AuthorizingRouter = () => {
  const companyRoles = useSelector(companySelector)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="error" element={<ErrorBoundary />} />
        <Route path="/" element={<Main />}>
          {AccessService.permittedRoutes(companyRoles)}
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/decline" element={<DeleteCompany />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AuthorizingRouter
