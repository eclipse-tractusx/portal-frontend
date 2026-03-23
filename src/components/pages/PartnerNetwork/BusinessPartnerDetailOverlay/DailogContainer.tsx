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
  Dialog,
  DialogContent,
  DialogHeader,
} from '@arena2036/portal-shared-components-construct-x'
import { Box, Grid } from '@mui/material'

interface DailogContainerProps {
  openDialog?: boolean
  dialogHeaderTitle: string
  handleOverlayClose: React.MouseEventHandler
  children: JSX.Element
}

const DialogContainer = ({
  openDialog = false,
  dialogHeaderTitle,
  handleOverlayClose,
  children,
}: DailogContainerProps) => {
  return (
    <Dialog
      open={openDialog}
      // sx={{
      //   '.MuiDialog-paper': {
      //     maxWidth: 700,
      //   },
      // }}
    >
      <DialogHeader
        {...{
          title: dialogHeaderTitle,
          closeWithIcon: true,
          onCloseWithIcon: handleOverlayClose,
        }}
      />

      <DialogContent
        sx={{
          padding: '0 30px',
          marginBottom: 5,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={1.5} style={{ marginTop: 0 }}>
            {children}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DialogContainer
