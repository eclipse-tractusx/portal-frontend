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

import { useEffect, useState, useMemo } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  CustomAccordion,
  Typography,
} from '@cofinity-x/shared-components'
import type { MenuItem, Tree } from 'types/MainTypes'
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
import RegistrationReviewOverlay from './RegistrationReviewOverlay'
import './style.scss'
import RegistrationReviewContent from './RegistrationReviewOverlay/RegistrationReviewContent'
import RegistrationDeclinedOverlay from './RegistrationDeclinedOverlay'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import { COMPANY_ROLES, ROLES } from 'types/Constants'
import { MainNavigation } from 'components/shared/generic'
import { ImageReferences } from 'types/ImageReferences'
import { HELP_LINK } from 'types/cfx/Constants'
import { setIsHeaderNote } from 'features/home/slice'
import { companySelector } from 'features/companyAccess/slice'
import UserService from 'services/UserService'

export const Header = ({
  main,
  user,
  userMenuWithChildren,
}: {
  main: Tree[] | undefined
  user: string[]
  userMenuWithChildren?: Tree[] | undefined
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()
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

  useEffect(() => {
    if (!companyData) return
    setSubmittedOverlayOpen(
      !companyDetails?.companyRole.includes(COMPANY_ROLES.OPERATOR) &&
        companyData?.applicationStatus === ApplicationStatus.SUBMITTED
    )
  }, [companyData])

  const companyRoles = useSelector(companySelector)

  const addTitle = (items: Tree[] | undefined) =>
    items
      ?.filter(
        (item: Tree) =>
          !item.companyRole ||
          (companyRoles.includes(item.companyRole) &&
            UserService.hasRole(ROLES.CONFIGURE_PARTNER_REGISTRATION))
      )
      .map(
        (item: Tree): MenuItem => ({
          ...item,
          to: `/${item.name}`,
          title: item.children
            ? t(`menu.heading.${item.name}`)
            : t(`pages.${item.name}`),
          hint: item.hint ? t(`hints.${item.hint}`) : '',
          children: addTitle(item.children),
        })
      )

  const menu = addTitle(main) ?? []

  const menuWithChild = addTitle(userMenuWithChildren) ?? []

  const activeMenuBucket = useMemo(() => {
    return menu.find((item) => {
      if (item.children) {
        return item.children.find((menuItem) => {
          if (menuItem.children) {
            return menuItem.children.find(
              (subItem) => subItem.to === location.pathname
            )
          }
          return menuItem.to === location.pathname
        })
      }
      return false
    })?.name
  }, [menu])

  const renderFullText = () => {
    return (
      <div
        className="registration-review"
        style={{
          width: isMobile ? '100%' : '60%',
        }}
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
                <Typography variant="label1" className="noteReviewText">
                  <img
                    src="/note_stack.svg"
                    alt="cx logo"
                    style={{
                      width: 24,
                    }}
                  />
                </Typography>
              ),
              id: 'panel-1',
              title: '',
              titleElement: !isMobile ? (
                <div>
                  <Typography
                    variant="label1"
                    className="noteReviewText"
                    sx={{ fontWeight: 500 }}
                  >
                    {isMobile
                      ? 'REGISTRATION IN REVIEW '
                      : t('content.registrationInreview.note')}
                  </Typography>
                  <Typography variant="label1" sx={{ fontWeight: 500 }}>
                    {t('content.registrationInreview.noteDetail')}
                  </Typography>
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
      <div
        className={`${UserService.isAdmin() ? 'user-is-admin' : 'user-is-not-admin'}`}
      >
        <header>
          <MainNavigation
            items={menu}
            component={NavLink}
            activeMenu={activeMenuBucket}
          >
            <Link to={'/'} className="logo">
              <img
                src={ImageReferences.logo.url}
                alt={ImageReferences.logo.alt}
              />
            </Link>
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
                variant="outlined"
                onClick={() => {
                  window.open(HELP_LINK(), 'documentation', 'noreferrer')
                }}
                className="documentation"
              >
                {t('pages.help')}
              </Button>
              <UserInfo pages={user} menuWithChild={menuWithChild} />
            </div>
          </MainNavigation>
        </header>
        <div className="mobileNav">
          <div className="mobileHeader">
            <Link to={'/'} className="logo-mobile">
              <img
                src={ImageReferences.logoMobile.url}
                alt={ImageReferences.logoMobile.alt}
              />
            </Link>
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
      </div>
      {headerNote && renderRegistrationNoteSection()}
      <RegistrationReviewOverlay
        openDialog={submittedOverlayOpen}
        handleOverlayClose={() => {
          setSubmittedOverlayOpen(false)
          setHeaderNote(true)
          dispatch(setIsHeaderNote({ headerNote: true }))
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
