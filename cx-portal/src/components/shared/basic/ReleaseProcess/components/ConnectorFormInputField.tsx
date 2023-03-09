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

import { Controller } from 'react-hook-form'
import { Dropzone } from 'components/shared/basic/Dropzone'
import {
  Input,
  Typography,
  MultiSelectList,
  Checkbox,
} from 'cx-portal-shared-components'
export const ConnectorFormInputField = ({
  control,
  trigger,
  errors,
  label,
  placeholder,
  name,
  rules,
  type,
  textarea,
  items,
  keyTitle,
  saveKeyTitle,
  notItemsText,
  buttonAddMore,
  filterOptionsArgs,
  acceptFormat,
  maxFilesToUpload,
  maxFileSize,
  defaultValues,
  enableDeleteIcon,
  handleDownload,
}: any) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, value } }) => {
      if (type === 'input') {
        return (
          <Input
            label={label}
            placeholder={placeholder}
            error={!!errors[name]}
            helperText={errors && errors[name] && errors[name].message}
            value={value}
            onChange={(event) => {
              trigger(name)
              onChange(event)
            }}
            multiline={textarea}
            minRows={textarea && 3}
            maxRows={textarea && 3}
            sx={
              textarea && {
                '.MuiFilledInput-root': { padding: '0px 12px 0px 0px' },
              }
            }
          />
        )
      } else if (type === 'dropzone') {
        return (
          <Dropzone
            files={value ? [value] : undefined}
            onChange={([file]) => {
              trigger(name)
              onChange(file)
            }}
            handleDownload={handleDownload}
            acceptFormat={acceptFormat}
            maxFilesToUpload={maxFilesToUpload}
            maxFileSize={maxFileSize}
            enableDeleteIcon={enableDeleteIcon}
          />
        )
      } else if (type === 'checkbox') {
        return (
          <>
            <Checkbox
              key={name}
              label={label}
              defaultChecked={defaultValues}
              value={defaultValues}
              checked={value}
              onChange={(event) => {
                trigger(name)
                onChange(event.target.checked)
              }}
            />
            {!!errors[name] && (
              <Typography variant="body2" className="file-error-msg">
                {errors[name].message}
              </Typography>
            )}
          </>
        )
      } else
        return (
          <MultiSelectList
            label={label}
            placeholder={placeholder}
            error={!!errors[name]}
            helperText={errors && errors[name] && errors[name].message}
            value={value}
            items={items}
            keyTitle={keyTitle}
            onAddItem={(items: any[]) => {
              trigger(name)
              onChange(items?.map((item) => item[saveKeyTitle]))
            }}
            notItemsText={notItemsText}
            buttonAddMore={buttonAddMore}
            tagSize="small"
            margin="none"
            filterOptionsArgs={filterOptionsArgs}
            defaultValues={defaultValues}
          />
        )
    }}
  />
)
