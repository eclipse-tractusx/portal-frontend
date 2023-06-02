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
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
  LoadingButton,
  Typography,
} from 'cx-portal-shared-components'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useTranslation, Trans } from 'react-i18next'
import { isURL } from 'types/Patterns'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import {
  SubscriptionActivationResponse,
  useAddUserSubscribtionMutation,
  useFetchTechnicalProfilesQuery,
} from 'features/appSubscription/appSubscriptionApiSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './style.scss'
import { store } from 'features/store'
import { setSuccessType } from 'features/appSubscription/slice'
import { Link } from 'react-router-dom'

const TentantHelpURL =
  '/documentation/?path=docs%2F04.App%28s%29%2F05.+App-Subscription%2F04.+Subscription+Activation%28App+Provider%29.md'
const ProfileHelpURL =
  '/documentation/?path=docs%2F04.App%28s%29%2F05.+App-Subscription%2F04.+Subscription+Activation%28App+Provider%29.md'

interface ActivateSubscriptionProps {
  openDialog: boolean
  appId: string
  subscriptionId: string
  title: string
  handleOverlayClose: () => void
}

const ActivateSubscriptionOverlay = ({
  openDialog = false,
  appId,
  subscriptionId,
  title,
  handleOverlayClose,
}: ActivateSubscriptionProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const [inputURL, setInputURL] = useState('')
  const [URLErrorMsg, setURLErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [activationResponse, setActivationResponse] =
    useState<SubscriptionActivationResponse>()

  const [addUserSubscribtion] = useAddUserSubscribtionMutation()
  const { data } = useFetchTechnicalProfilesQuery(appId)

  const addInputURL = (value: string) => {
    setInputURL(value)
    setURLErrorMessage(
      !isURL(value.trim())
        ? t('content.appSubscription.pleaseEnterValidURL')
        : ''
    )
  }

  const addTentantURL = async () => {
    setLoading(true)
    try {
      const subscriptionData = await addUserSubscribtion({
        requestId: subscriptionId,
        offerUrl: inputURL,
      }).unwrap()
      setActivationResponse(subscriptionData)
    } catch (error) {
      console.log(error)
    }
  }

  const closeActivationOverlay = () => {
    dispatch(setSuccessType(true))
    handleOverlayClose()
  }

  return (
    <>
      {activationResponse ? (
        <div className="activationOverlay">
          <Dialog
            open={true}
            sx={{
              '.MuiDialog-paper': {
                maxWidth: '45%',
              },
            }}
          >
            <DialogHeader
              title=" "
              intro={t('content.appSubscription.activation.successDescription')}
              closeWithIcon={true}
              icon={true}
              iconComponent={
                <CheckCircleOutlinedIcon
                  sx={{ fontSize: 60 }}
                  color="success"
                />
              }
              onCloseWithIcon={() => handleOverlayClose()}
            />
            <DialogContent>
              <table className="activationResponse">
                <tbody>
                  <tr>
                    <td>
                      <Typography variant="label3">
                        {t('content.appSubscription.activation.clientId')}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="label3">
                        {
                          activationResponse?.technicalUserInfo
                            .technicalClientId
                        }
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
                        {
                          activationResponse?.technicalUserInfo
                            .technicalUserSecret
                        }
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
          </Dialog>
        </div>
      ) : (
        <Dialog
          open={openDialog}
          sx={{
            '.MuiDialog-paper': {
              maxWidth: '45%',
            },
          }}
        >
          <DialogHeader
            title={t('content.appSubscription.activation.heading')}
            intro={t('content.appSubscription.activation.intro').replace(
              '{{companyName}}',
              title
            )}
            closeWithIcon={true}
            onCloseWithIcon={() => handleOverlayClose()}
          />
          <DialogContent>
            <div className="appSubscriptionMain">
              <Trans
                values={{
                  companyName: title,
                }}
              >
                <Typography variant="caption2">
                  {t('content.appSubscription.activation.stepDescription')}
                </Typography>
              </Trans>
              <ol>
                <li>
                  <Typography variant="caption2">
                    {t('content.appSubscription.activation.step1')}
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption2">
                    {t('content.appSubscription.activation.step2')}
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption2">
                    {t('content.appSubscription.activation.step3')}
                  </Typography>
                </li>
              </ol>
              <Typography variant="h4">
                {t('content.appSubscription.activation.addTentalURLHeading')}
              </Typography>
              <Typography variant="caption2">
                {t(
                  'content.appSubscription.activation.addTentalURLDescription'
                )}
              </Typography>
              <Link to={TentantHelpURL} target="_blank">
                <Typography variant="caption2" className="helpText">
                  <HelpOutlineIcon />
                  {t('pages.help')}
                </Typography>
              </Link>
              <Input
                name="tentant_url"
                label={t('content.appSubscription.activation.enterURL')}
                placeholder={t('content.appSubscription.activation.enterURL')}
                onChange={(e) => addInputURL(e.target.value)}
                value={inputURL}
              />
              <p>{URLErrorMsg}</p>

              {inputURL && URLErrorMsg === '' && (
                <div className="mt-30">
                  <Typography variant="h4">
                    {t(
                      'content.appSubscription.activation.technicalUserDetailsHeading'
                    )}
                  </Typography>
                  <Typography variant="caption3">
                    {t(
                      'content.appSubscription.activation.technicalUserDetailsDescription'
                    )}
                  </Typography>
                  <Link to={ProfileHelpURL} target="_blank">
                    <Typography variant="caption2" className="helpText">
                      <HelpOutlineIcon />
                      {t('pages.help')}
                    </Typography>
                  </Link>
                  <div className="technicalUserProfile">
                    <Typography variant="h5">
                      {t(
                        'content.appSubscription.activation.technicalUserProfileHeading'
                      )}
                    </Typography>
                    <Typography variant="caption3">
                      {data?.map((profiles) => {
                        return profiles.userRoles?.map((userRole) => (
                          <Typography variant="caption3" key={userRole.roleId}>
                            {userRole.roleName}
                          </Typography>
                        ))
                      })}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => handleOverlayClose()}>
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
                disabled={!inputURL || URLErrorMsg !== ''}
                onClick={addTentantURL}
              >
                {t('global.actions.confirm')}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default ActivateSubscriptionOverlay
