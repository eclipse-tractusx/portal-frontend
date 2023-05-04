/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Typography,
} from 'cx-portal-shared-components'
import { closeOverlay } from 'features/control/overlay'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import './AppOverviewConfirm.scss'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
import { setApplicationId } from 'features/appManagement/slice'

export default function AppOverViewConfirm({
  id,
  title,
}: {
  id: string
  title?: string
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const close = () => dispatch(closeOverlay())
  const navigate = useNavigate()
  dispatch(setApplicationId(id))

  return (
    <div className="small-confirm">
      <DialogHeader
        {...{
          title: title
            ? t('content.appoverview.confirmModal.title').replace(
                '{appName}',
                title
              )
            : '',
          closeWithIcon: true,
          onCloseWithIcon: close,
        }}
      />

      <DialogContent
        sx={{
          width: '90%',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        {title && (
          <Typography variant="h5">
            {t('content.appoverview.confirmModal.description').replace(
              '{appName}',
              title
            )}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            minWidth: '100px',
          }}
          variant="outlined"
          onClick={close}
        >
          {`${t('global.actions.no')}`}
        </Button>
        <Button
          sx={{
            mr: '2',
            minWidth: '100px',
          }}
          variant="contained"
          onClick={() => {
            close()
            navigate(`/${PAGES.APPRELEASEPROCESS}/form`)
          }}
        >
          {`${t('global.actions.yes')}`}
        </Button>
      </DialogActions>
    </div>
  )
}
