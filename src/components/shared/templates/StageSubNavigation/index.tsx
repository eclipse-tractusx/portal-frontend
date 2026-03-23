/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
  ParentSubNavigation,
  NewSubNavigation,
} from '@arena2036/portal-shared-components-construct-x'
import '../style.scss'
import { Box, useMediaQuery } from '@mui/material'
import { type SubNavigationType } from 'features/staticContent/staticContentApiSlice'

export const StageSubNavigation = ({
  linkArray,
  fixHeader,
}: {
  linkArray: SubNavigationType[]
  fixHeader: boolean
}): JSX.Element => {
  const isWeb = useMediaQuery('(min-width: 1600px)')
  const scrollToId = (id: string): void => {
    const element = document.getElementById(id)
    if (element !== null) {
      const top = element.offsetTop - 100

      window.scrollTo({
        top: top ?? 0,
        behavior: 'smooth',
      })
    }
  }

  const customStyles = fixHeader && {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 9,
    backgroundColor: '#F5F9FD',
    boxShadow: '0px 5px 10px rgb(80 80 80 / 30%)',
  }

  return (
    <Box
      className="customHeight"
      sx={{
        backgroundColor: 'rgba(15, 113, 203, 0.05)',
        ...customStyles,
      }}
    >
      <div className="subNavigationContainer">
        {isWeb ? (
          <ParentSubNavigation
            navigationArray={linkArray}
            onClick={(value: string) => {
              scrollToId(value)
            }}
          />
        ) : (
          <NewSubNavigation
            onClick={(value: string) => {
              scrollToId(value)
            }}
            navigationArray={linkArray}
          />
        )}
      </div>
    </Box>
  )
}
