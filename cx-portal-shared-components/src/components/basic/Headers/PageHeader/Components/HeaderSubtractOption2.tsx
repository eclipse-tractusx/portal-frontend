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

import { PageHeaderProps } from '../PageHeader'

export const HeaderSubtractOption2 = ({ hasSubtract }: PageHeaderProps) => {
  return (
    <>
      {hasSubtract && (
        <svg
          width="100%"
          viewBox="0 0 1440 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100% !important',
            backgroundSize: '100% 100%',
            bottom: 0,
            position: 'absolute',
          }}
        >
          <path
            height="32"
            d="M1440 26.0298V32H0V0C213.932 13.6025 455.058 23.4951 710.403 28.2495C972.585 33.131 1220.52 32.0511 1440 26.0298Z"
            fill="#fff"
          />
        </svg>
      )}
    </>
  )
}
