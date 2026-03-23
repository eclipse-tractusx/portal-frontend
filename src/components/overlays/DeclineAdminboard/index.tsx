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

import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
  LoadingButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import type { store } from 'features/store'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import './style.scss'

type DeclineType = {
  handleConfirm: (msg: string) => void
  confirmBtn: string
  closeBtn: string
  title: string
  subHeading: string
  declineReason: string
  declineReason1Label: string
  declineReason2Label: string
  declineReason3Label: string
  inputLabel: string
}

export default function DeclineAdminBoard({
  handleConfirm,
  confirmBtn,
  closeBtn,
  title,
  subHeading,
  declineReason,
  declineReason1Label,
  declineReason2Label,
  declineReason3Label,
  inputLabel,
}: DeclineType) {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className="decline-modal-main">
      <DialogHeader
        {...{
          title,
          intro: subHeading,
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(closeOverlay()),
        }}
      />
      <DialogContent>
        <div className="decline-modal-input">
          <Typography variant="label2">{declineReason}</Typography>
          <ul>
            <li>
              <Typography variant="label2">{declineReason1Label}</Typography>
            </li>
            <li>
              <Typography variant="label2">{declineReason2Label}</Typography>
            </li>
            <li>
              <Typography variant="label2">{declineReason3Label}</Typography>
            </li>
          </ul>
          <Input
            label={inputLabel}
            sx={{
              paddingTop: '10px',
            }}
            multiline
            rows={2}
            maxRows={4}
            placeholder={''}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setInputMessage(e.target.value)
            }}
            value={inputMessage}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {closeBtn}
        </Button>
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator="Loading ..."
            loading
            size="medium"
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setLoading(true)
              handleConfirm(inputMessage)
            }}
          >
            {confirmBtn}
          </Button>
        )}
      </DialogActions>
    </div>
  )
}
