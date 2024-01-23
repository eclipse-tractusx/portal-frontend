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

import { useEffect, useState } from 'react'
import { Navigation, IconButton } from '@nidhi.garg/portal-shared-components'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import './Footer.scss'
import { PAGES } from 'types/Constants'
import { currentActiveStep } from 'features/appManagement/slice'
import { useSelector } from 'react-redux'

export const Footer = ({ pages }: { pages: string[] }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const items = pages.map((page) => ({
    to: page,
    title: t(`pages.${page}`),
  }))
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const isAppOverviewPage = [
    PAGES.APPOVERVIEW,
    PAGES.APP_MANAGEMENT,
    PAGES.APPRELEASEPROCESS,
    PAGES.SERVICE_MARKETPLACE,
  ].find((e) => location.pathname.split('/').includes(e))

  const isAppDarkOverviewPage = [PAGES.USER_MANAGEMENT].find((e) =>
    location.pathname.split('/').includes(e)
  )

  const isAppReleaseProcessForm = [`${PAGES.APPRELEASEPROCESS}/form`].find(() =>
    location.pathname.split('/').includes('form')
  )

  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const activePage = useSelector(currentActiveStep)

  const toggleVisibility = () => {
    setShowScrollToTop(window.pageYOffset > 350)
  }

  const getPreferredColor = () => {
    if (activePage === 7) {
      return '#e4ebf3'
    } else if (isAppReleaseProcessForm) {
      return '#ffffff'
    } else if (isAppOverviewPage) {
      return '#F9F9F9'
    } else if (isAppDarkOverviewPage) {
      return '#ededed'
    } else {
      return ''
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <footer style={{ background: getPreferredColor() }}>
      {showScrollToTop && (
        <IconButton
          color="secondary"
          onClick={scrollToTop}
          sx={{ position: 'absolute', right: '40px', top: '2px' }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
      <img
        className="footer-head"
        src="/orange-background-head.svg"
        alt="orange background"
      />
      <div className="footer-content">
        <Navigation unstyled items={items} component={NavLink} />
        <span className="copyright">{`${t('content.footer.copyright')}`}</span>
      </div>
    </footer>
  )
}
