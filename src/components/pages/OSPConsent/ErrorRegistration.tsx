/********************************************************************************
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing software
 * distributed under the License is distributed on an AS IS BASIS WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import type { Dispatch, SetStateAction } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  LoadingButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'

interface ErrorRegProps {
  loading: boolean
  handleSubmit: () => void
  setIsError: Dispatch<SetStateAction<boolean>>
}

export const ErrorRegistration = ({
  loading,
  handleSubmit,
  setIsError,
}: ErrorRegProps) => {
  const { t } = useTranslation('registration')

  return (
    <div className="registration-error">
      <Trans>
        <Typography variant="body2" className="description">
          {t('osp.error.description')}
        </Typography>
      </Trans>
      <div className="retryBtn">
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator="Loading ..."
            loading
            size="small"
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button variant="contained" size="small" onClick={handleSubmit}>
            {t('osp.error.retry')}
          </Button>
        )}
        <Button
          variant="outlined"
          size="small"
          className="backBtn"
          onClick={() => {
            setIsError(false)
          }}
        >
          {t('osp.error.back')}
        </Button>
      </div>
      <div className="helpdeskText">
        <Trans>
          <Typography variant="body3">{t('osp.helpText')}</Typography>
        </Trans>
      </div>
    </div>
  )
}
