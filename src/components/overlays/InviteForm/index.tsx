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

import './style.scss'
import type { InviteData } from 'features/admin/registration/types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
  LoadingButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Patterns from 'types/Patterns'
import { ProcessingType } from 'components/pages/InviteBusinessPartner'

interface AddInviteFormOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  onSubmit: (data: InviteData) => void
  state: string
}

export const InviteForm = ({
  openDialog = false,
  handleOverlayClose,
  onSubmit,
  state,
}: AddInviteFormOverlayProps) => {
  const { t } = useTranslation()
  const [inpExpr, setInpExpr] = useState<string[]>(['', '', '', ''])
  const [inpValid, setInpValid] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    true,
  ])

  useEffect(() => {
    if (openDialog) {
      setInpExpr(['', '', '', ''])
      setInpValid([false, false, false, false, true])
    }
  }, [openDialog])

  const debouncedValidation = useMemo(
    () =>
      debounce((expr: string[]) => {
        const check = [
          Patterns.COMPANY_NAME,
          Patterns.MAIL,
          Patterns.name,
          Patterns.name,
        ].map((p, i) => !p.test(expr[i]))
        check.push(check.reduce((all, valid) => all || valid, false))
        setInpValid(check)
      }, 300),
    [setInpValid]
  )

  const doValidate = useCallback(
    (index: number, value: string) => {
      const data = inpExpr
      data[index] = value
      setInpExpr(data.slice())
      debouncedValidation(data)
    },
    [debouncedValidation, inpExpr]
  )

  const doSubmit = () => {
    onSubmit({
      userName: inpExpr[1].trim(),
      firstName: inpExpr[2].trim(),
      lastName: inpExpr[3].trim(),
      email: inpExpr[1].trim(),
      organisationName: inpExpr[0].trim(),
    })
  }

  return (
    <Dialog open={openDialog} sx={{ '.MuiDialog-paper': { maxWidth: '60%' } }}>
      <DialogHeader
        title={t('content.invite.headerTitle')}
        intro={t('content.invite.headerIntro')}
      />
      <DialogContent sx={{ padding: '0px 130px 40px 150px' }}>
        <form className="InviteForm">
          {['company', 'email', 'first', 'last'].map((value, i) => (
            <Input
              label={
                <Typography variant="body2">
                  {t(`global.field.${value}`)}
                </Typography>
              }
              key={i}
              name={value}
              placeholder={t(`global.field.${value}`)}
              value={inpExpr[i]}
              error={inpValid[i]}
              autoFocus={value === 'company'}
              onChange={(e) => {
                doValidate(i, e.target.value)
              }}
            ></Input>
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={(e) => {
            handleOverlayClose(e)
          }}
        >
          {`${t('global.actions.cancel')}`}
        </Button>
        {state === ProcessingType.BUSY ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator={t('global.actions.loading')}
            loading
            size="medium"
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button name="send" disabled={inpValid[4]} onClick={doSubmit}>
            {`${t('content.invite.invite')}`}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
