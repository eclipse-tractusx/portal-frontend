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

import { Typography } from '.'

export default {
  title: 'Typography',
  argTypes: {},
}

export const Base = () => (
  <>
    <Typography variant="h1">Headline 1</Typography>
    <Typography variant="h2">Headline 2</Typography>
    <Typography variant="h3">Headline 3</Typography>
    <Typography variant="h4">Headline 4</Typography>
    <Typography variant="h5">Headline 5</Typography>
    <Typography variant="body1">
      Body 1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
      maiores quod saepe quos officiis. Fugiat mollitia sunt, praesentium
      possimus iusto soluta error placeat veniam nisi cum itaque voluptas sequi
      reprehenderit?
    </Typography>
    <Typography variant="body2">
      Body 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
      maiores quod saepe quos officiis. Fugiat mollitia sunt, praesentium
      possimus iusto soluta error placeat veniam nisi cum itaque voluptas sequi
      reprehenderit?
    </Typography>
    <Typography variant="body3">
      Body 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum ut
      laborum non labore iure harum minus velit, necessitatibus sunt vero,
      dolore aut maiores repudiandae! Quibusdam, nihil? Ab molestiae sint
      labore!
    </Typography>
    <Typography variant="label1" display="block">
      Label 1
    </Typography>
    <Typography variant="label2" display="block">
      Label 2
    </Typography>
    <Typography variant="label3" display="block">
      Label 3
    </Typography>
    <Typography variant="label4" display="block">
      Label 4
    </Typography>
    <Typography variant="label5" display="block">
      Label 5
    </Typography>
    <Typography variant="caption1" display="block">
      Caption 1
    </Typography>
    <Typography variant="caption2" display="block">
      Caption 2
    </Typography>
    <Typography variant="caption3" display="block">
      Caption 3
    </Typography>
    <Typography variant="helper" display="block">
      Helper
    </Typography>
  </>
)
