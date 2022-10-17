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

import { Breadcrumb, PageHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'

export default function PageHeaderWithCrumbs({ crumbs }: { crumbs: string[] }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const page = crumbs[crumbs.length - 1]
  const path = crumbs.slice(0, -1)
  path.unshift('home')
  const title = t(`pages.${page}`)
  return (
    <PageHeader title={title} topPage={true} headerHeight={200}>
      <Breadcrumb
        backButtonLabel="Back"
        backButtonVariant="contained"
        breadcrumbs={path
          .map((crumb) => (
            <NavLink
              style={{
                display: 'block',
                marginBottom: '2px',
                fontSize: '14px',
              }}
              key={crumb}
              to={`/${crumb}`}
            >
              {t(`pages.${crumb}`)}
            </NavLink>
          ))
          .concat(
            <NavLink
              key={page}
              style={{
                display: 'block',
                marginBottom: '2px',
                fontSize: '14px',
                color: 'black',
                textDecoration: 'none',
              }}
              to="#"
            >
              {title}
            </NavLink>
          )}
        onBackButtonClick={() => navigate(`/${path[path.length - 1]}`)}
      />
    </PageHeader>
  )
}
