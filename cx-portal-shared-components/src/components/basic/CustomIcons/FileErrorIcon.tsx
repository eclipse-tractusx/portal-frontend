/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

interface FileIconProps {
  fillColor?: string
  size?: number
}

export const FileErrorIcon = ({ fillColor, size }: FileIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 58 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.3201 55.2001L4.91005 2.79007L0.680054 7.02007L8.90005 15.2401L8.54005 15.6001V48.5701C8.54005 51.8701 11.2401 54.5701 14.5401 54.5701H44.5401C45.59 54.5701 46.58 54.2701 47.45 53.7901L53.0901 59.4301L57.3201 55.2001ZM14.5401 48.5701V20.8801L42.23 48.5701H14.5401ZM26.0601 6.57007H44.5401V33.9001L50.54 39.9001V6.57007C50.54 3.27007 47.84 0.570068 44.5401 0.570068H23.5701L17.3901 6.75007L21.6201 10.9801L26.0601 6.57007Z"
        fill={fillColor}
      />
    </svg>
  )
}
