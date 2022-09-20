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

import { Box } from '@mui/material'
import CXLogo from '../../../assets/logo/cx-logo.svg'
import CXLogoShort from '../../../assets/logo/cx-logo-short.svg'
import CXLogoText from '../../../assets/logo/cx-logo-text.svg'

interface LogoProps {
  variant: 'standard' | 'short' | 'text'
  altText: string
}

export const LogoGrayData =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii04IC04IDY4LjUgNzEuNiI+PHBhdGggZD0iTTQwIDI4LjY5di02YTEgMSAwIDAwLTEuNTUtLjgyTDE0LjY5IDM4LjMxYTQuMTEgNC4xMSAwIDAxLTYuNDUtMy4zOFYyN2E4LjIzIDguMjMgMCAwMTMuNTUtNi43Nmw3LjA4LTQuODlBNC4wNyA0LjA3IDAgMDAyMC42MyAxMlYuOTlBMSAxIDAgMDAxOS4xLjE4bC01IDMuNDJBNC4wOCA0LjA4IDAgMDAxMi4zOCA3djIuODRMNi4zIDE0QTE0LjU3IDE0LjU3IDAgMDAwIDI2djguODlhMTIuMzYgMTIuMzYgMCAwMDE5LjM4IDEwLjJsMTguOS0xM2E0LjA5IDQuMDkgMCAwMDEuNzItMy40eiIgZmlsbD0iI2I0YjRiNCIvPjxwYXRoIGQ9Ik0zMyAxMC42M2wtMTguOSAxM0E0LjA5IDQuMDkgMCAwMDEyLjM1IDI3djZhMSAxIDAgMDAxLjU1LjgxbDIzLjgxLTE2LjRhNC4xMSA0LjExIDAgMDE2LjQ0IDMuMzh2Ny45YTguMjUgOC4yNSAwIDAxLTMuNTUgNi43N2wtNi4zMyA0LjM2LS43Mi41YTQuMDYgNC4wNiAwIDAwLTEuNzUgMy4zNHYxMS4wMmExIDEgMCAwMDEuNTUuODFsNS0zLjQzQTQuMDUgNC4wNSAwIDAwNDAgNDguNzJ2LTIuODVsNi4wNi00LjE4YTE0LjU4IDE0LjU4IDAgMDA2LjI5LTEyVjIwLjhBMTIuMzUgMTIuMzUgMCAwMDMzIDEwLjYzeiIgZmlsbD0iI2ExYTFhMSIvPjwvc3ZnPg=='

export const Logo = ({
  variant = 'standard',
  altText = 'Catena-X logo',
  ...props
}: LogoProps) => {
  let image

  switch (variant) {
    case 'short':
      image = CXLogoShort
      break
    case 'text':
      image = CXLogoText
      break
    default:
      image = CXLogo
  }

  return (
    <Box
      component="img"
      sx={{
        maxWidth: '100%',
      }}
      src={image}
      alt={altText}
      {...props}
    />
  )
}
