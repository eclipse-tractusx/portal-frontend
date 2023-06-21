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

import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogHeader,
  DropArea,
  DropAreaProps,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { fetchAny } from 'features/admin/userOwn/actions'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './style.scss'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay'
import { store } from 'features/store'
import { Dropzone } from '../../shared/basic/Dropzone'

export default function EditUsecase({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchAny(id))
  }, [dispatch, id])

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="small" />
  }

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.usecaseParticipation.editUsecase.title'),
          intro: t('content.usecaseParticipation.editUsecase.description'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        <div className="edit-usecase">
          <Dropzone
            acceptFormat={{ 'application/pdf': [] }}
            maxFilesToUpload={1}
            onChange={([file]) => {
              setUploadedFile(file)
            }}
            errorText={'helperText'}
            DropStatusHeader={false}
            DropArea={renderDropArea}
          />
          <div className="checkbox-confirmation">
            <Checkbox
              label={`${t(
                'content.usecaseParticipation.editUsecase.checkboxLabel'
              )}`}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE, ''))}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          // onClick={saveRoles}
          disabled={!checked || uploadedFile === undefined}
        >
          {t('global.actions.submit')}
        </Button>
      </DialogActions>
    </>
  )
}
