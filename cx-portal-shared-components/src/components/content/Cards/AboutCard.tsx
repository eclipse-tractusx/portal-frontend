/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box } from '@mui/material'
import { Typography } from '../../basic/Typography'

function LinkText(props: LinkType) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '20px 20px',
        cursor: 'pointer',
        placeItems: 'center',
      }}
      onClick={() => window.open(props.url, '_blank')}
    >
      <Typography>
        {props.text} {props.url}
      </Typography>
      <OpenInNewIcon />
    </Box>
  )
}

function TitleText(props: LinkType) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '20px 20px',
        cursor: 'pointer',
        placeItems: 'center',
      }}
      onClick={() => window.open(props.url, '_blank')}
    >
      <Typography variant="h3" sx={{ paddingRight: '10px' }}>
        {props.text}
      </Typography>
      <OpenInNewIcon />
    </Box>
  )
}

type LinkType = {
  text: string
  url: string
}

export const AboutCard = (props: {
  name: string
  repositoryPath: string
  license: string
  licensePath: string
  noticePath: string
  sourcePath: string
  commitId: string
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '1200px',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          background: '#FFFFFF',
          boxShadow: '0px 5px 10px rgba(80, 80, 80, 0.3)',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        <Box>
          <TitleText text={props.name} url={props.repositoryPath} />
          <Box
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            {props.license && (
              <Typography
                sx={{
                  padding: '20px 20px',
                }}
              >
                {props.license}
              </Typography>
            )}
          </Box>
          {props.licensePath && (
            <LinkText text="Licence Path: " url={props.licensePath} />
          )}
          {props.noticePath && (
            <LinkText text="NOTICE: " url={props.noticePath} />
          )}
          {props.sourcePath && (
            <LinkText text="Source URL: " url={props.sourcePath} />
          )}
          {props.commitId && (
            <Box>
              <Typography
                sx={{
                  padding: '20px 20px',
                }}
              >
                Commit Id : {props.commitId}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
