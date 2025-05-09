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
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
  LoadingButton,
  Typography,
} from '@catena-x/portal-shared-components'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useTranslation, Trans } from 'react-i18next'
import { isKeycloakURL } from 'types/Patterns'
import { useAddUserSubscribtionMutation } from 'features/appSubscription/appSubscriptionApiSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './style.scss'
import type { store } from 'features/store'
import { setSuccessType } from 'features/appSubscription/slice'
import { Link } from 'react-router-dom'
import { useFetchTechnicalUserProfilesQuery } from 'features/appManagement/apiSlice'
import { success, error } from 'services/NotifyService'

const TentantHelpURL =
  '/documentation/?path=user%2F04.+App%28s%29%2F05.+App+Subscription%2F04.+Subscription+Activation+%28App+Provider%29.md'
const ProfileHelpURL =
  '/documentation/?path=user%2F04.+App%28s%29%2F05.+App+Subscription%2F04.+Subscription+Activation+%28App+Provider%29.md'

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

  const [addUserSubscribtion] = useAddUserSubscribtionMutation()
  const { data } = useFetchTechnicalUserProfilesQuery(appId)

  const addInputURL = (value: string) => {
    setInputURL(value)
    setURLErrorMessage(
      !isKeycloakURL(value.trim())
        ? t('content.appSubscription.pleaseEnterValidURL')
        : ''
    )
  }

  const addTentantURL = async () => {
    setLoading(true)
    try {
      await addUserSubscribtion({
        requestId: subscriptionId,
        offerUrl: inputURL,
      }).unwrap()
      dispatch(setSuccessType(true))
      success(t('content.appSubscription.configuration'))
    } catch (err) {
      dispatch(setSuccessType(false))
      error(t('content.appSubscription.error'), '', err as object)
    } finally {
      setLoading(false)
      handleOverlayClose()
    }
  }

  return (
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
        closeWithIcon={false}
      />
      <DialogContent>
        <div className="appSubscriptionMain">
          <Trans
            values={{
              companyName: title,
            }}
          >
            <Typography variant="body2">
              {t('content.appSubscription.activation.stepDescription')}
            </Typography>
          </Trans>
          <ol>
            <li>
              <Typography variant="body2">
                {t('content.appSubscription.activation.step1')}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                {t('content.appSubscription.activation.step2')}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                {t('content.appSubscription.activation.step3')}
              </Typography>
            </li>
          </ol>
          <Typography variant="h5" className="addTentalURLHeading">
            {t('content.appSubscription.activation.addTentalURLHeading')}
          </Typography>
          <Typography variant="body2">
            {t('content.appSubscription.activation.addTentalURLDescription')}
          </Typography>
          <Link to={TentantHelpURL} target="_blank">
            <Typography variant="body2" className="helpText">
              <HelpOutlineIcon />
              {t('pages.help')}
            </Typography>
          </Link>
          <Input
            name="tentant_url"
            label={
              <Typography variant="label3">
                {t('content.appSubscription.activation.enterURL')}
              </Typography>
            }
            placeholder={t('content.appSubscription.activation.enterURL')}
            onChange={(e) => {
              addInputURL(e.target.value)
            }}
            value={inputURL}
          />
          <p className="errorMsg">{URLErrorMsg}</p>
          <Typography variant="h5" className="addTentalURLHeading">
            {t(
              'content.appSubscription.activation.technicalUserDetailsHeading'
            )}
          </Typography>
          <Typography variant="body2">
            {t(
              'content.appSubscription.activation.technicalUserDetailsDescription'
            )}
          </Typography>
          <Link to={ProfileHelpURL} target="_blank">
            <Typography variant="body2" className="helpText">
              <HelpOutlineIcon />
              {t('pages.help')}
            </Typography>
          </Link>
          <div className="technicalUserProfile">
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
              {t(
                'content.appSubscription.activation.technicalUserProfileHeading'
              )}
            </Typography>
            {data?.map((profiles) => {
              return profiles.userRoles?.map((userRole) => (
                <Typography variant="body2" key={userRole.roleId}>
                  {userRole.roleName}
                </Typography>
              ))
            })}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            handleOverlayClose()
          }}
        >
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
            onButtonClick={() => {
              // do nothing
            }}
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
  )
}

export default ActivateSubscriptionOverlay
