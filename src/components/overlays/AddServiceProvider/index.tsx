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
  CircleProgress,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
  LoadingButton,
  PageSnackbar,
  Typography,
} from '@catena-x/portal-shared-components'
import { closeOverlay } from 'features/control/overlay'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import './style.scss'
import {
  useAddServiceProviderMutation,
  useFetchServiceProviderQuery,
} from 'features/serviceProvider/serviceProviderApiSlice'
import Patterns from 'types/Patterns'
import { setSuccessType } from 'features/serviceProvider/slice'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'

export default function AddServiceProvider() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [inputURL, setInputURL] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [UrlErrorMsg, setUrlErrorMessage] = useState('')
  const [saveErrorMsg, setSaveErrorMessage] = useState(false)

  const { data, refetch } = useFetchServiceProviderQuery()
  const [addServiceProvider] = useAddServiceProviderMutation()
  useEffect(() => {
    refetch()
    dispatch(setSuccessType(false))
  }, [refetch, dispatch])

  const addInputURL = (value: string) => {
    setInputURL(value ?? null)
    if (!value) return
    if (!Patterns.URL.test(value.trim())) {
      setUrlErrorMessage(t('content.appSubscription.pleaseEnterValidURL'))
    } else {
      setUrlErrorMessage('')
    }
  }

  const addURL = async () => {
    if (inputURL) setLoading(true)
    else setDeleteLoading(true)
    try {
      await addServiceProvider({ url: inputURL }).unwrap()
      dispatch(setSuccessType(true))
      dispatch(closeOverlay())
    } catch (error) {
      setLoading(false)
      setSaveErrorMessage(true)
    }
  }

  return (
    <div className="registerUrlMain">
      <DialogHeader
        {...{
          title: t('content.appSubscription.register.heading'),
          intro: t('content.appSubscription.register.message'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(closeOverlay()),
        }}
      />

      <DialogContent>
        <div className="manageInputURL">
          {data ? (
            <>
              <div className="urlListMain">
                <Typography variant="body2">
                  {t('content.appSubscription.register.endpointConfigured')}
                </Typography>
                <div className="urlList">
                  {data?.url ? (
                    <>
                      {deleteLoading ? (
                        <CircleProgress
                          colorVariant="primary"
                          interval={800}
                          iteration
                          size={20}
                          step={100}
                          thickness={1}
                          variant="indeterminate"
                        />
                      ) : (
                        <DeleteIcon
                          onClick={() => {
                            addURL()
                          }}
                          className="deleteIcon"
                        />
                      )}
                      <Typography variant="label2" className="urlDetail">
                        {data.url}
                      </Typography>
                    </>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
              <Input
                label={
                  <Typography variant="body2">
                    {t('content.appSubscription.register.autosetupURL')}
                  </Typography>
                }
                placeholder={t(
                  'content.appSubscription.register.inputPlaceholder'
                )}
                onChange={(e) => {
                  addInputURL(e.target.value)
                }}
                value={inputURL}
              />
              <p className="error">{UrlErrorMsg}</p>
            </>
          ) : (
            <div className="progress">
              <CircleProgress
                colorVariant="primary"
                interval={800}
                iteration
                size={50}
                step={100}
                thickness={5}
                variant="indeterminate"
              />
            </div>
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
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
              void addURL()
            }}
            disabled={UrlErrorMsg !== '' || !inputURL}
          >
            {t('global.actions.confirm')}
          </Button>
        )}
      </DialogActions>
      <PageSnackbar
        open={saveErrorMsg}
        onCloseNotification={() => {
          setSaveErrorMessage(false)
        }}
        severity="error"
        description={t('content.appSubscription.register.providerErrorMessage')}
        showIcon={true}
      />
    </div>
  )
}
