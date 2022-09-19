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

import { createAction } from '@reduxjs/toolkit'
import { ErrorServiceState, name } from './types'

const setError = createAction(
  `${name}/setError`,
  function update(error: ErrorServiceState) {
    return {
      payload: {
        hasError: error.hasError,
        hasNavigation: error.hasNavigation,
        header: error.header,
        title: error.title,
        description: error.description,
        reloadPageLink: error.reloadPageLink,
        reloadButtonTitle: error.reloadButtonTitle,
        homePageLink: error.homePageLink,
        homeButtonTitle: error.homeButtonTitle,
      },
    }
  }
)

const resetError = createAction(`${name}/resetError`)

export { setError, resetError }
