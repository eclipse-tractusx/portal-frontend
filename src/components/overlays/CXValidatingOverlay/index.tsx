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
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useState } from 'react'
import type { IHashMap } from 'types/MainTypes'
import { ValidatingForm, type ValidationField } from './ValidatingForm'

export const CXValidatingOverlay = ({
  title,
  subtitle,
  submitLabel,
  fields,
  onSubmit,
}: {
  title: string
  subtitle: string
  submitLabel: string
  fields: Array<ValidationField>
  onSubmit: (formData: IHashMap<string>) => void
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<IHashMap<string> | undefined>()
  const onValid = (formValues: IHashMap<string> | undefined) => {
    setFormData(formValues)
  }

  return (
    <>
      <DialogHeader
        title={title}
        intro={subtitle}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <ValidatingForm fields={fields} onValid={onValid} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            formData && onSubmit(formData)
          }}
          disabled={!formData}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </>
  )
}
