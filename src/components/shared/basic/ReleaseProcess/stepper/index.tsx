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

import { Stepper } from '@nidhi.garg/portal-shared-components'

export interface StepType {
  headline?: string
  step?: number
}

export default function ReleaseStepper({
  activePage,
  stepsList,
  numberOfSteps,
}: {
  activePage: number
  stepsList: StepType[]
  numberOfSteps: number
}) {
  return (
    <Stepper
      list={stepsList}
      showSteps={numberOfSteps}
      activeStep={activePage}
    />
  )
}
