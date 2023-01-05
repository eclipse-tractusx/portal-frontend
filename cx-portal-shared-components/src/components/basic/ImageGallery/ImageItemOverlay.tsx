/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { Dialog } from '../Dialog'
import { DialogContent } from '../Dialog/DialogContent'
import { DialogHeader } from '../Dialog/DialogHeader'
import { ImageType } from './types'

export default function ImageItemOverlay({
  image,
  onClose,
}: {
  image: ImageType
  onClose: () => void
}) {
  return (
    <div>
      <Dialog open={true}>
        <DialogHeader
          title={image.text || ''}
          closeWithIcon={true}
          onCloseWithIcon={() => {
            if (onClose) onClose()
          }}
        />
        <DialogContent>
          <div>
            <img
              src={image.url}
              alt={image.text}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: image.borderRadius ? '16px' : '0px',
                objectFit: 'cover',
                boxShadow: image.shadow
                  ? '0px 10px 20px rgb(80 80 80 / 30%)'
                  : 'none',
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
