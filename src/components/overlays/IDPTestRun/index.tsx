/********************************************************************************
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

import React, { useState } from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
} from '@nidhi.garg/portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useTranslation } from 'react-i18next'
import './style.scss'

interface FormState {
  username: string
  userId: string
}

function IDPTestRun() {
  const [formValues, setFormValues] = useState<FormState>({
    username: '',
    userId: '',
  })
  const [errors, setErrors] = useState({ username: '', userId: '' })
  const [touched, setTouched] = useState({ username: false, userId: false })
  const [disable, setDisable] = useState<boolean>(true)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormValues((prevState) => {
      const newState = { ...prevState, [name]: value }
      setTouched({ ...touched, [name]: true })
      validateValues(newState)
      return newState
    })
  }

  const validateValues = (formValues: FormState) => {
    setErrors((prevState) => {
      let errors = { userId: '', username: '' }

      if (!formValues.userId)
        errors = { ...errors, userId: t('overlays.idp_form_userId_error') }

      if (!formValues.username)
        errors = { ...errors, username: t('overlays.idp_form_username_error') }

      setDisable(checkIfButtonAvailable(errors))
      return errors
    })
  }

  const checkIfButtonAvailable = (errors: {
    username: string
    userId: string
  }) => Boolean(errors.userId || errors.username)

  return (
    <>
      <DialogHeader
        closeWithIcon
        onCloseWithIcon={() => dispatch(closeOverlay())}
        title="Identity Provider Creation"
      ></DialogHeader>
      <DialogContent>
        <div className="idp-test-container">
          <div className="idp-test-description">
            <p>{t('overlays.idp_test_intro1')}</p>
            <p>{t('overlays.idp_test_intro2')}</p>
            <p>{t('overlays.idp_test_description')}</p>
          </div>

          <div className="idp-test-steps">
            <p>{t('overlays.idp_test_step_text1')}</p>
            <ol>
              <li>{t('overlays.idp_test_step_text2')}</li>
              <li>{t('overlays.idp_test_step_text3')}</li>
              <li>{t('overlays.idp_test_step_text4')}</li>
            </ol>
          </div>
        </div>

        <div className="idp-test-info">
          <p>
            {t('global.field.redirectURI')}: {'{redirect uri}'}
          </p>
          <p>
            {t('global.field.userName')}: {'{current user username}'}
          </p>
        </div>

        <div className="idp-test-form">
          <div className="idp-test-form-input">
            <Input
              label={t('overlays.idp_test_userid_label')}
              placeholder={t('global.field.userId')}
              name="userId"
              value={formValues.userId}
              onChange={handleOnChange}
              helperText={touched.userId && errors.userId}
              error={Boolean(touched.userId && errors.userId)}
            />
          </div>

          <div className="idp-test-form-input">
            <Input
              label={t('overlays.idp_test_username_label')}
              placeholder={t('global.field.userName')}
              name="username"
              onChange={handleOnChange}
              value={formValues.username}
              helperText={touched.username && errors.username}
              error={Boolean(touched.username && errors.username)}
            />
          </div>
          <div className="idp-test-form-submit">
            <Button disabled={disable} color="primary">
              {`${t('global.actions.submit')}`}
            </Button>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => dispatch(closeOverlay())} variant="outlined">
          {`${t('global.actions.cancel')}`}
        </Button>
        <Button disabled={disable} variant="contained">
          {`${t('global.actions.save')}`}
        </Button>
      </DialogActions>
    </>
  )
}

export default IDPTestRun
