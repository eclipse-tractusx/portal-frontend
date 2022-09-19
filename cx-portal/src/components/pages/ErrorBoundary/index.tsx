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

import AccessService from '../../../services/AccessService'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../shared/frame/Header'
import { ErrorPage } from 'cx-portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import { errorSelector } from 'features/error/slice'
import { resetError } from 'features/error/actions'

export default function ErrorBoundary() {
  const { t } = useTranslation()
  const error = useSelector(errorSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const reloadButtonTitleText = () => {
    if (error.reloadButtonTitle) {
      return t(error.reloadButtonTitle)
    }

    return t('global.actions.reload')
  }

  const homeButtonTitleText = () => {
    if (error.homeButtonTitle) {
      return t(error.homeButtonTitle)
    }

    return t('global.actions.homepage')
  }

  const handleReload = () => {
    if (error.reloadPageLink) {
      navigate(error.reloadPageLink)
    } else {
      navigate('/home')
    }
    dispatch(resetError())
  }

  const handleHome = () => {
    if (error.homePageLink) {
      navigate(error.homePageLink)
    } else {
      navigate('/home')
    }
    dispatch(resetError())
  }

  const title = () => {
    if (error.title) {
      return error.title
    }

    return t('global.errors.title')
  }

  const description = () => {
    if (error.description) {
      return error.description
    }

    return t('global.errors.description')
  }

  const additionalDescription = () => {
    return t('global.errors.additionalDescription')
  }

  return (
    <div>
      {error.hasNavigation && (
        <Header
          main={AccessService.mainMenuTree()}
          user={AccessService.userMenu()}
        />
      )}

      <ErrorPage
        hasNavigation={error.hasNavigation}
        header={error.header}
        title={title()}
        description={description()}
        additionalDescription={additionalDescription()}
        reloadButtonTitle={reloadButtonTitleText()}
        homeButtonTitle={homeButtonTitleText()}
        onReloadClick={() => handleReload()}
        onHomeClick={() => handleHome()}
      />
    </div>
  )
}
