/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { useTranslation } from 'react-i18next'
import { Logo, Typography } from '@catena-x/portal-shared-components'
import './CompanyCertificate.scss'
import { type ComapnyCertificateData } from 'features/companyCertification/companyCertificateApiSlice'
import { Box } from '@mui/material'
import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export default function CompanyCertificateCard({
    item,
}: Readonly<{
    item: ComapnyCertificateData
}>) {
    const { t } = useTranslation()
    const [dotsMenu, setDotsMenu] = useState(false)
    return (
        <Box className='card-container'>
            <Box className='first-container'>
                <Logo />
            </Box>
            <Box className='second-container'>
                <Box className='top-container'>
                    <Typography variant="h4">{item.companyCertificateType}</Typography>
                    <Box className='dots' onClick={() => {
                        setDotsMenu(!dotsMenu)
                    }}>
                        <MoreVertIcon />
                    </Box>
                </Box>
                <Box className='bottom-container'>
                    <Typography variant="label3">{t('content.companyCertificate.validtill')} : {item.validTill}</Typography>
                    <Box className='link' onClick={() => {
                        // show overlay
                    }}>
                        <Typography variant='label3'>{t('content.companyCertificate.morelink')}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
