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
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import {
  Button,
  CustomAccordion,
  MainNavigation,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import type { MenuItem, Tree } from 'types/MainTypes'
import { getAssetBase } from 'services/EnvironmentService'
import {
  ApplicationStatus,
  useFetchApplicationsQuery,
} from 'features/registration/registrationApiSlice'
import {
  appearSearchSelector,
  setAppear,
  appearMenuSelector,
} from 'features/control/appear'
import { UserInfo } from '../UserInfo'
import { Logo } from '../Logo'
import RegistrationReviewOverlay from './RegistrationReviewOverlay'
import './style.scss'
import RegistrationReviewContent from './RegistrationReviewOverlay/RegistrationReviewContent'
import RegistrationDeclinedOverlay from './RegistrationDeclinedOverlay'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import { COMPANY_ROLES } from 'types/Constants'

export const Header = ({
  main,
  user,
}: {
  main: Tree[] | undefined
  user: string[]
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })

  const visible = useSelector(appearSearchSelector)
  const appearShow = useSelector(appearMenuSelector)

  const { data } = useFetchApplicationsQuery()
  const companyData = data?.[0]
  const { data: companyDetails } = useFetchOwnCompanyDetailsQuery('')
  const [submittedOverlayOpen, setSubmittedOverlayOpen] =
    useState<boolean>(false)
  const [headerNote, setHeaderNote] = useState(false)

  // Due to the dynamic class 'css-429xfk', overwrite the logo container padding //
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.css-429xfk')!
    if (el) {
      el.style.paddingTop = '0px'
      el.style.paddingBottom = '0px'
    }
  }, [])

  useEffect(() => {
    if (!(companyData && companyDetails)) return
    setSubmittedOverlayOpen(
      !companyDetails?.companyRole.includes(COMPANY_ROLES.OPERATOR) &&
        companyData?.applicationStatus === ApplicationStatus.SUBMITTED
    )
  }, [companyData, companyDetails])

  const addTitle = (items: Tree[] | undefined) =>
    items?.map(
      (item: Tree): MenuItem => ({
        ...item,
        to: `/${item.name}`,
        title: t(`pages.${item.name}`),
        hint: item.hint ? t(`hints.${item.hint}`) : '',
        children: addTitle(item.children),
      })
    )

  const menu = addTitle(main) ?? []

  const renderFullText = () => {
    return (
      <div
        className="registration-review"
        style={{ width: isMobile ? '100%' : '40%', margin: '0 auto' }}
      >
        <RegistrationReviewContent />
        <div className="helpMain">
          <Trans>
            <Typography variant="label3">
              {t('content.registrationInreview.helpText')}
            </Typography>
            <Typography variant="label3" className="emailText">
              {t('content.registrationInreview.email')}
            </Typography>
          </Trans>
        </div>
      </div>
    )
  }

  const renderRegistrationNoteSection = () => {
    return (
      <div
        style={{
          margin: isMobile ? '75px 10px 40px' : '20px',
          border: '1px solid #FF7100',
          boxShadow: '0px 20px 40px rgba(80, 80, 80, 0.3)',
          borderRadius: '5px',
        }}
        className="registrationReviewNoteSection"
      >
        <CustomAccordion
          items={[
            {
              children: renderFullText(),
              expanded: false,
              icon: (
                <Typography variant="label3" className="noteReviewText">
                  <SortIcon className="subjectIcon" />
                  {isMobile
                    ? 'REGISTRATION IN REVIEW '
                    : t('content.registrationInreview.note')}
                </Typography>
              ),
              id: 'panel-1',
              title: '',
              titleElement: !isMobile ? (
                <div>
                  <Trans>
                    <Typography variant="label3">
                      {t('content.registrationInreview.noteDetail')}
                    </Typography>
                    <Typography variant="label3" className="emailText">
                      {t('content.registrationInreview.email')}
                    </Typography>
                  </Trans>
                </div>
              ) : (
                <></>
              ),
              buttonText: t('global.actions.close'),
            },
          ]}
        />
      </div>
    )
  }

  return (
    <>
      <header>
        <MainNavigation items={menu} component={NavLink}>
          <Logo />
          <div className="d-flex">
            <div
              onClick={() => dispatch(setAppear({ SEARCH: !visible }))}
              className="search-icon"
              onKeyUp={() => {
                // do nothing
              }}
            >
              <SearchIcon className="searchIcon" />
            </div>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => {
                window.open(
                  `${document.location.origin}/documentation/`,
                  'documentation',
                  'noreferrer'
                )
              }}
              className="documentation"
            >
              {t('pages.help')}
            </Button>
            <UserInfo pages={user} />
          </div>
        </MainNavigation>
      </header>
      <div className="mobileNav">
        <div className="mobileHeader">
          <img
            src={`${getAssetBase()}/images/logos/construct-x-logo.svg`}
            alt="logo"
            style={{ width: '100px' }}
          />
        </div>
        <div className="mobileHeaderRight">
          <div
            onClick={() => dispatch(setAppear({ SEARCH: !visible }))}
            className="mobile-search-icon"
            onKeyDown={() => {
              // do nothing
            }}
          >
            <SearchIcon className="searchIcon" />
          </div>
          <Box
            onClick={() => dispatch(setAppear({ MENU: !appearShow }))}
            className="mobile-search-icon"
            onKeyDown={() => {
              // do nothing
            }}
          >
            <MenuIcon className="searchIcon" />
          </Box>
        </div>
      </div>
      {headerNote && renderRegistrationNoteSection()}
      <RegistrationReviewOverlay
        openDialog={submittedOverlayOpen}
        handleOverlayClose={() => {
          setSubmittedOverlayOpen(false)
          setHeaderNote(true)
        }}
      />
      <RegistrationDeclinedOverlay
        openDialog={
          companyData?.applicationStatus === ApplicationStatus.DECLINED
        }
      />
    </>
  )
}
