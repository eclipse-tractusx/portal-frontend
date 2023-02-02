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
  strokeColor?: string
  size?: number
}

export const FileIcon = ({ fillColor, strokeColor, size }: FileIconProps) => {
  return (
    <svg
      stroke={strokeColor}
      fill={fillColor}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M36 16V18H47V16H36Z" />
      <path d="M36 26H47V28H36V26Z" />
      <path d="M17 36V38H47V36H17Z" />
      <path d="M17 46H47V48H17V46Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 15V29H31V15H17ZM19 27V17H29V27H19Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 3C9.34315 3 8 4.34314 8 6V58C8 59.6569 9.34314 61 11 61H53C54.6569 61 56 59.6569 56 58V6C56 4.34315 54.6569 3 53 3H11ZM10 6C10 5.44771 10.4477 5 11 5H53C53.5523 5 54 5.44771 54 6V58C54 58.5523 53.5523 59 53 59H11C10.4477 59 10 58.5523 10 58V6Z"
      />
    </svg>
  )
}
