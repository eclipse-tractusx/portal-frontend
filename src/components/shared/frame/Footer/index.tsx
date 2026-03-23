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

import { useEffect, useState } from 'react'
import {
  Navigation,
  ScrollToTopButton,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import './style.scss'
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
    PAGES.APP_OVERVIEW,
    PAGES.APP_MANAGEMENT,
    PAGES.APP_RELEASE_PROCESS,
    PAGES.SERVICE_MARKETPLACE,
  ].find((e) => location.pathname.split('/').includes(e))

  const isAppDarkOverviewPage = [PAGES.USER_MANAGEMENT].find((e) =>
    location.pathname.split('/').includes(e)
  )

  const isAppReleaseProcessForm = [`${PAGES.APP_RELEASE_PROCESS}/form`].find(
    () => location.pathname.split('/').includes('form')
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
      {showScrollToTop && <ScrollToTopButton onButtonClick={scrollToTop} />}
      <img
        id="footer-head"
        className="footer-head"
        //src="/orange-background-head.jpg"
        //alt="orange background"
      />
      <div className="footer-content">
        <img
          id="footer-logo"
          src="/BMWE2025_NextGenEU.svg"
          alt="BMWE 2025 Next Gen EU"
          style={{ display: 'inline', width: '350px' }}
        />
        <Navigation unstyled items={items} component={NavLink} />
        <span className="copyright">{`${t('content.footer.copyright')}`}</span>
      </div>
    </footer>
  )
}
