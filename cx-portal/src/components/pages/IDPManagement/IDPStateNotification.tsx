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

import { PageSnackbar } from 'cx-portal-shared-components'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import { useTranslation } from 'react-i18next'

export enum IDPState {
  NONE = 'NONE',
  SUCCESS_VALID_FORMAT = 'SUCCESS_VALID_FORMAT',
  SUCCESS_UPLOAD_USERS = 'SUCCESS_UPLOAD_USERS',
  SUCCESS_DELETE_IDP = 'SUCCESS_DELETE_IDP',
  ERROR_MULTIPLE_FILES = 'ERROR_MULTIPLE_FILES',
  ERROR_INVALID_TYPE = 'ERROR_INVALID_TYPE',
  ERROR_INVALID_FORMAT = 'ERROR_INVALID_FORMAT',
  ERROR_UPLOAD_USERS = 'ERROR_UPLOAD_USERS',
  ERROR_DELETE_IDP = 'ERROR_DELETE_IDP',
}

export enum FileFormat {
  JSON = 'JSON',
  CSV = 'CSV',
}

const IDPStateNotification = ({ state }: { state: IDPState }) => {
  const { t } = useTranslation('idp')
  const error = state.toString().startsWith('ERROR')
  return (
    <PageSnackbar
      autoClose
      title={t(
        `state.${error ? SuccessErrorType.ERROR : SuccessErrorType.SUCCESS}`
      )}
      description={t(`state.${state}`)}
      open={state !== IDPState.NONE}
      severity={error ? SuccessErrorType.ERROR : SuccessErrorType.SUCCESS}
      showIcon
    />
  )
}

export default IDPStateNotification
