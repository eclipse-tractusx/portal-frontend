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

import React, { useState, useEffect } from 'react'
import MuiDialog from '@mui/material/Dialog'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
import { Button, CircleProgress, Typography } from 'cx-portal-shared-components'
import CheckList, {
  ProgressButtonsProps,
} from 'components/shared/basic/CheckList'
import { Divider } from '@mui/material'

interface CheckListStatusOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  selectedButton?: ProgressButtonsProps
  modalWidth?: string
  progressButtons?: Array<ProgressButtonsProps>
}

const CheckListStatusOverlay = ({
  openDialog = false,
  handleOverlayClose,
  selectedButton,
  modalWidth = '900',
  progressButtons,
}: CheckListStatusOverlayProps) => {
  const loading = false
  // const [loading, setLoading] = useState<boolean>(false)
  const [selectedCheckListButton, setSelectedCheckListButton] =
    useState<ProgressButtonsProps>()
  const [checkListButton, setCheckListButton] =
    useState<ProgressButtonsProps[]>()

  useEffect(() => {
    selectedButton && setSelectedCheckListButton(selectedButton)
    progressButtons && setCheckListButton(progressButtons)
  }, [selectedButton, progressButtons])

  const reset = (button: ProgressButtonsProps) => {
    setCheckListButton(progressButtons)
    button.highlight = true
    setSelectedCheckListButton(button)
  }

  return (
    <MuiDialog
      sx={{
        '.MuiPaper-root': {
          minWidth: `${modalWidth}px`,
          borderRadius: '40px',
        },
      }}
      open={openDialog}
    >
      <MuiDialogContent
        sx={{
          fontFamily: 'fontFamily',
          textAlign: 'center',
          padding: '70px 110px',
        }}
      >
        <div
          style={{
            marginBottom: '35px',
          }}
        >
          <CheckList
            progressButtons={checkListButton}
            showCancel={false}
            alignRow="center"
            selectedButton={selectedCheckListButton}
            onButtonClick={(button) => {
              reset(button)
            }}
          />
        </div>
        <div
          style={{
            textAlign: 'left',
            marginBottom: '30px',
          }}
        >
          <Typography
            sx={{
              paddingBottom: '10px',
              fontWeight: '600',
            }}
            variant="h3"
          >
            Step [label of process step]
          </Typography>
          <Typography
            sx={{
              paddingBottom: '10px',
            }}
            variant="body2"
          >
            [Description] nIb quvmoHiuweyriw chaw nuQ pIqaD way mIQ SeHlaw
            tungHa' taS, ghor jatIh wanI' pab wuv qugh ghoma' jIv. Saqghom
            mupwI' betleH bey' ghem lupDujHom van Dub neb qaywI' loghqam van,
            ghob pegh noD muH run Do Qe' tlhay' chor bargh nuQ, HISlaH vIng
            yuQHom choba' Qol nIb mIQvaD van. SIbI' ghoma' alskdj lkahslkajhsfd
            wanI' qaywI' toq roS vulqan, tlham yIt voQ Hoqra' SIm Qaw, maj 'eb
            qIvon HIch DIj puq poH. So qeq nuH loghqam 'ov yIt qImHa', pegh
            qumwI' matlh janluq pIqarD Saj ray', chor bargh to'waQvaD He pegh
          </Typography>
        </div>
        <Divider sx={{ borderBottomStyle: 'dashed' }} />
        <Divider sx={{ borderBottomStyle: 'dashed' }} />
        <div
          style={{
            textAlign: 'left',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          <Typography
            sx={{
              paddingBottom: '10px',
              fontWeight: '600',
            }}
            variant="h6"
          >
            No action needed from your side - the confirmation process will be
            continued automatically
          </Typography>
          <Typography
            sx={{
              paddingBottom: '10px',
            }}
            variant="body2"
          >
            [Description] asklj quvmoHiuweyriw chaw nuQ akjhsd way mIQ aljskhd
            tungHa' taS, ghor jatIh wanI' pa He pegh
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          <Button
            size="small"
            sx={{
              marginRight: '20px',
            }}
            variant="contained"
            onClick={(e) => {}}
          >
            CTA
          </Button>
        </div>
        <Divider sx={{ borderBottomStyle: 'dashed' }} />
        <div
          style={{
            textAlign: 'left',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          <Typography
            sx={{
              paddingBottom: '10px',
              fontWeight: '600',
            }}
            variant="h6"
          >
            Comments
          </Typography>
          <Typography
            sx={{
              paddingBottom: '10px',
            }}
            variant="body2"
          >
            [note] nIb quvmoHiuweyriw chaw nuQ pIqaD way mIQ SeHlaw tungHa' taS,
            ghor jatIh wanI' pa He pegh
          </Typography>
        </div>
        <Divider sx={{ borderBottomStyle: 'dashed' }} />
        <div
          style={{
            textAlign: 'left',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          <Typography
            sx={{
              paddingBottom: '10px',
              fontWeight: '600',
            }}
            variant="h6"
          >
            No action needed from your side - the confirmation process will be
            continued automatically
          </Typography>
          <Typography
            sx={{
              paddingBottom: '10px',
            }}
            variant="body2"
          >
            [Description] nIb quvmoHiuweyriw chaw askjhf pIqaD way mIQ SeHlaw
            tungHa' taS, ghor jatIh wanI' pa He pegh
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          <Button
            size="small"
            sx={{
              marginRight: '20px',
            }}
            variant="contained"
            onClick={(e) => {}}
          >
            Cancel Process
          </Button>
          {loading && (
            <span
              style={{
                marginLeft: '25px',
                width: '116px',
                textAlign: 'center',
              }}
            >
              <CircleProgress
                size={40}
                step={1}
                interval={0.1}
                colorVariant={'primary'}
                variant={'indeterminate'}
                thickness={8}
              />
            </span>
          )}
          {!loading && (
            <Button size="small" variant="outlined">
              Retrigger Process
            </Button>
          )}
        </div>
      </MuiDialogContent>
      <MuiDialogActions
        sx={{
          '&.MuiDialogActions-root': {
            background: '#EDF0F4',
            padding: '20px',
          },
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={(e) => handleOverlayClose(e)}
        >
          Close
        </Button>
      </MuiDialogActions>
    </MuiDialog>
  )
}

export default CheckListStatusOverlay
