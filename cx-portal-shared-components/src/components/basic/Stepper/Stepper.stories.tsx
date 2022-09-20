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

import { ComponentStory } from '@storybook/react'

import { Stepper as Component } from '.'

export default {
  title: 'Steppers',
  component: Component,
  argTypes: {},
}

const stepperElements = [
  {
    step: 1,
    headline: 'App Market Card',
  },
  {
    step: 2,
    headline: 'Contract & Consent',
  },
  {
    step: 3,
    headline: 'Technical Integration',
  },
  {
    step: 4,
    headline: 'Beta Test',
  },
  {
    step: 5,
    headline: 'Validate & Publish',
  },
  {
    step: 6,
    headline: 'Verify your company data',
  },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Stepper = Template.bind({})
Stepper.args = {
  list: stepperElements,
  showSteps: 6,
  activeStep: 2,
}
