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
  Tooltips,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useEffect, useRef, useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import './style.scss'

export enum InputType {
  text = 'text',
  password = 'password',
}

export enum Colors {
  main = 'black',
  secondary = '#aaaaaa',
  error = '#aa0000',
  success = 'darkblue',
}

export type BasicInputProps = {
  name?: string
  label?: string
  hint?: string
  value?: string
  onValue?: (value: string) => void
  type?: InputType
  disabled?: boolean
  toggleHide?: boolean
  errorMessage?: string
  style?: React.CSSProperties
  valid?: boolean
}

const BasicInputStyle = {
  fontFamily: 'Montserrat-Light',
  width: '100%',
  fontSize: '16px',
  borderLeft: 0,
  borderRight: 0,
  borderTop: 0,
  borderRadius: '6px 6px 0 0',
  outline: 'none',
  display: 'block',
  backgroundColor: '#eeeeee',
  padding: '17px',
}

const BasicInput = ({
  name = '',
  label = '',
  hint = '',
  value = '',
  onValue,
  type = InputType.text,
  disabled = false,
  toggleHide = false,
  errorMessage,
  style,
  valid,
}: BasicInputProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState<boolean>(type === InputType.password)
  const [hidden, setHidden] = useState<boolean>(type === InputType.password)

  const toggleHidden = () => {
    setHidden(!hidden)
    ref.current?.focus()
  }

  useEffect(() => {
    ref.current && (ref.current.value = value ?? '')
    setFocus(document.activeElement === ref.current)
  }, [value])

  useEffect(() => {
    if (value !== '') {
      onValue?.(value)
    }
  }, [value])

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', marginTop: '12px', minHeight: '27px' }}>
        {label && (
          <Typography
            variant="label3"
            sx={{ textAlign: 'left', marginRight: '10px', color: Colors.main }}
          >
            {label}
          </Typography>
        )}
        {hint && (
          <Tooltips
            additionalStyles={{
              cursor: 'pointer',
              marginTop: '30px !important',
            }}
            tooltipPlacement="top-start"
            tooltipText={hint}
          >
            <div>
              <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
            </div>
          </Tooltips>
        )}
      </div>
      <div className="actionWrapper">
        <input
          ref={ref}
          style={{
            ...BasicInputStyle,
            ...{
              borderBottom: `2px solid ${
                !valid ? Colors.error : Colors.secondary
              }`,
            },
            ...style,
          }}
          name={name}
          type={hidden ? InputType.password : InputType.text}
          defaultValue={value}
          disabled={disabled}
          onKeyUp={() => {
            onValue?.(ref.current?.value ?? '')
          }}
          onBlur={() => {
            setFocus(false)
          }}
          onFocus={() => {
            setFocus(true)
          }}
        />
        <div className={'actions'}>
          {(type === InputType.password || toggleHide) &&
            (hidden ? (
              <VisibilityIcon
                style={{ marginLeft: '8px', color: Colors.secondary }}
                onClick={toggleHidden}
              />
            ) : (
              <VisibilityOffIcon
                style={{ marginLeft: '8px', color: Colors.secondary }}
                onClick={toggleHidden}
              />
            ))}
          {!valid && (
            <ErrorOutlineIcon
              style={{ marginLeft: '8px', color: Colors.error }}
            />
          )}
        </div>
      </div>
      {!valid && (
        <div style={{ width: '100%', height: '12px' }}>
          {
            // eslint-disable-next-line
            (errorMessage || focus) && (
              <Typography
                sx={{ color: errorMessage ? Colors.error : Colors.secondary }}
                variant={'label4'}
              >
                {errorMessage}
              </Typography>
            )
          }
        </div>
      )}
    </div>
  )
}

export default BasicInput
