/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import { useState, useEffect } from 'react'

interface CircleProgressProps extends Omit<CircularProgressProps, 'variant'> {
  step?: number
  interval?: number
  iteration?: boolean
  variant: 'determinate' | 'indeterminate'
  colorVariant:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
}

export const CircleProgress = ({
  step = 25,
  interval = 800,
  iteration = true,
  thickness = 8,
  size = 80,
  colorVariant,
  variant,
}: CircleProgressProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const rerun = iteration ? 0 : 100
      setProgress((prevProgress: number) =>
        prevProgress >= 100 ? rerun : prevProgress + step
      )
    }, interval)

    return () => {
      clearInterval(timer)
    }
  }, [interval, step, iteration])

  return (
    <CircularProgress
      variant={variant}
      value={progress}
      color={colorVariant}
      size={size}
      thickness={thickness}
    />
  )
}
