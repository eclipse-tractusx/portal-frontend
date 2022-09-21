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

import { Breadcrumb } from 'cx-portal-shared-components'
import { Link, Typography } from '@mui/material'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

interface PageBreadcrumbProps {
  backButtonVariant?: 'text' | 'contained' | 'outlined'
}

function isParamsEmpty(params: object) {
  for (let param in params) {
    if (param) return false
  }
  return true
}

export const PageBreadcrumb = ({
  backButtonVariant = 'text',
}: PageBreadcrumbProps) => {
  const navigate = useNavigate()
  const params = useParams() as object
  const location = useLocation()
  const [crumbs, setCrumbs] = useState<string[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    const pathNames = location.pathname.split('/')
    pathNames.forEach((value, index) => {
      if (value === '') {
        pathNames.splice(index, 1)
      }
    })

    // no need to add params to breadcrumbs:
    if (!isParamsEmpty(params)) {
      pathNames.splice(pathNames.length - 1, 1)
    }
    setCrumbs(pathNames)
  }, [location, params])

  const getCrumbTitle = (crumb: string) => {
    return t('pages.'.concat(crumb))
  }

  const breadcrumbs = () => {
    const crumbsArr: any[] = []
    crumbs.forEach((item: string, index) => {
      const count = crumbs.length - 1
      const navigatePage = count - index
      if (index === count) {
        // last item in breadcrumb has noch navigation
        crumbsArr.push(
          <Typography
            key={index}
            color="text.primary"
            sx={{ fontSize: '14px' }}
          >
            {getCrumbTitle(item)}
          </Typography>
        )
      } else {
        // other items in breadcrumbs has navigation
        crumbsArr.push(
          <Link
            underline="hover"
            key={index}
            color="inherit"
            sx={{
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: index === 0 ? 'bold' : '',
            }}
            onClick={() => navigate(-navigatePage)}
          >
            <p style={{ marginTop: '3px !important' }}>{getCrumbTitle(item)}</p>
          </Link>
        )
      }
    })

    return crumbsArr
  }

  return (
    <Breadcrumb
      backButtonLabel={t('global.actions.back')}
      backButtonVariant={backButtonVariant}
      onBackButtonClick={() => navigate(-1)}
      breadcrumbs={breadcrumbs()}
    />
  )
}
