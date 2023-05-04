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

import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
  LoadingButton,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import Patterns from 'types/Patterns'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import {
  SubscriptionActivationResponse,
  useAddUserSubscribtionMutation,
} from 'features/appSubscription/appSubscriptionApiSlice'
import { closeOverlay } from 'features/control/overlay'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './style.scss'
import { store } from 'features/store'
import { setSuccessType } from 'features/appSubscription/slice'

export default function AddBPN({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const [inputURL, setInputURL] = useState('')
  const [URLErrorMsg, setURLErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [activationResponse, setActivationResponse] =
    useState<SubscriptionActivationResponse>()

  const [addUserSubscribtion] = useAddUserSubscribtionMutation()

  const addInputURL = (value: string) => {
    setInputURL(value)
    if (!Patterns.URL.test(value.trim())) {
      setURLErrorMessage(t('content.appSubscription.pleaseEnterValidURL'))
    } else {
      setURLErrorMessage('')
    }
  }

  const addTentantURL = async () => {
    setLoading(true)
    try {
      const subscriptionData = await addUserSubscribtion({
        requestId: id,
        offerUrl: inputURL,
      }).unwrap()
      setActivationResponse(subscriptionData)
    } catch (error) {
      console.log(error)
    }
  }

  const closeActivationOverlay = () => {
    dispatch(setSuccessType(true))
    dispatch(closeOverlay())
  }

  return (
    <>
      {activationResponse ? (
        <div className="activationOverlay">
          <DialogHeader
            title=" "
            intro={t('content.appSubscription.activation.successDescription')}
            closeWithIcon={true}
            icon={true}
            iconComponent={
              <CheckCircleOutlinedIcon sx={{ fontSize: 60 }} color="success" />
            }
            onCloseWithIcon={() => dispatch(closeOverlay())}
          />
          <DialogContent>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Typography variant="label3">
                      {t('content.appSubscription.activation.clientId')}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="label3">
                      {activationResponse &&
                        activationResponse.technicalUserInfo.technicalClientId}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="label3">
                      {t('content.appSubscription.activation.clientSecret')}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="label3">
                      {activationResponse &&
                        activationResponse.technicalUserInfo
                          .technicalUserSecret}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={closeActivationOverlay}>
              {t('global.actions.close')}
            </Button>
          </DialogActions>
        </div>
      ) : (
        <>
          <DialogHeader
            {...{
              title: t('content.appSubscription.activation.heading'),
              intro: t('content.appSubscription.activation.description'),
              closeWithIcon: true,
              onCloseWithIcon: () => dispatch(closeOverlay()),
            }}
          />
          <DialogContent>
            <div className="URLInput">
              <Input
                name="tentant_url"
                label="Tentant URL*"
                placeholder="URL of the customer tentant"
                onChange={(e) => addInputURL(e.target.value)}
                value={inputURL}
              />
              <p>{URLErrorMsg}</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
              {t('global.actions.close')}
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
                onButtonClick={() => {}}
                sx={{ marginLeft: '10px' }}
              />
            ) : (
              <Button
                variant="contained"
                disabled={URLErrorMsg !== ''}
                onClick={addTentantURL}
              >
                {t('global.actions.confirm')}
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </>
  )
}
