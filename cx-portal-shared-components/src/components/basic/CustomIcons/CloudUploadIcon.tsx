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

interface CloudUploadIconProps {
  fillColor?: string
  strokeColor?: string
  size?: number
}

export const CloudUploadIcon = ({
  fillColor,
  strokeColor,
  size,
}: CloudUploadIconProps) => {
  return (
    <svg
      stroke={strokeColor}
      fill={fillColor}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M34.0564 4.0989C29.2262 3.62826 24.3822 4.84705 20.3499 7.54759C16.4885 10.1337 13.6001 13.9255 12.1296 18.3219C9.09136 18.9441 6.34109 20.5648 4.3227 22.935C2.16928 25.4638 0.990824 28.6791 1.00005 32.0005C1.00697 35.5278 2.33859 38.9238 4.73108 41.5157C7.12367 44.1077 10.4026 45.7063 13.9183 45.9948L13.9591 45.9982H25.0001V43.9982H14.0419C11.0411 43.7419 8.24408 42.3728 6.20068 40.1591C4.14821 37.9356 3.00589 35.0222 3.00005 31.9962C2.99206 29.1518 4.00123 26.3973 5.8454 24.2317C7.68957 22.0661 10.2472 20.6311 13.0566 20.1858L13.6759 20.0877L13.8573 19.4874C15.1272 15.2847 17.815 11.6524 21.4629 9.20934C25.1107 6.76629 29.4928 5.66371 33.8624 6.08947C38.2321 6.51523 42.3189 8.44299 45.4265 11.5443C48.5342 14.6455 50.4703 18.7284 50.905 23.0972L50.9872 23.9235L51.8145 23.9945C54.3128 24.209 56.6406 25.3501 58.3403 27.1936C60.04 29.037 60.9888 31.4496 61.0002 33.957C61.0116 36.4645 60.0848 38.8855 58.4019 40.7444C56.7293 42.5918 54.4302 43.7511 51.9515 43.9982H39V45.9982H52.0475L52.0946 45.9937C55.0879 45.7093 57.8665 44.3157 59.8845 42.0867C61.9025 39.8577 63.0139 36.9546 63.0002 33.9479C62.9865 30.9412 61.8488 28.0484 59.8107 25.8378C57.9585 23.829 55.4844 22.5157 52.8001 22.0998C52.1736 17.5733 50.0842 13.3669 46.8393 10.1286C43.4042 6.70047 38.8866 4.56953 34.0564 4.0989Z" />
      <path d="M32 24.584L44.4142 36.9982L43 38.4124L33 28.4124V59.9982H31V28.4124L21 38.4124L19.5858 36.9982L32 24.584Z" />
    </svg>
  )
}
