/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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

import { Button } from '@cofinity-x/shared-components'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'

interface PageInfoType {
  title?: string
  description?: string
  buttonLabel?: string
  buttonAction?: () => void
}
export default function PageInfo({
  title,
  description,
  buttonLabel,
  buttonAction,
}: PageInfoType) {
  return (
    <>
      <div className="cx-page-info">
        <div className="cx-page-info__container">
          {title && (
            <div className="cx-page-info__title">
              <SubHeaderTitle title={title} variant="h3" />
            </div>
          )}
          {description && (
            <div className="cx-page-info__subtitle">
              <SubHeaderTitle title={description} variant="body1" />
            </div>
          )}
          {buttonLabel && buttonAction && (
            <div className="cx-page-info__button">
              <Button
                size="small"
                startIcon={<AddCircleOutlineIcon />}
                onClick={buttonAction}
              >
                {buttonLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
