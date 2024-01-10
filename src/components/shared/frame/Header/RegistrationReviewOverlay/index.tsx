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

import { Trans, useTranslation } from 'react-i18next'
import {
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogActions,
    StatusTag,
} from '@catena-x/portal-shared-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import LoopIcon from '@mui/icons-material/Loop'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import { type ApplicationChecklist, useFetchApplicationsQuery } from 'features/registration/registrationApiSlice'
import './RegistrationReview.scss'
import uniqueId from 'lodash/uniqueId'

export type StatusTagIcon = {
    type?: 'confirmed' | 'pending' | 'declined' | 'label'
}

export type RegistrationReviewProps = {
    openDialog: boolean
    handleOverlayClose: React.MouseEventHandler
}

const RegistrationReviewOverlay = ({openDialog, handleOverlayClose}: RegistrationReviewProps) => {
    const { t } = useTranslation()
    const { data } = useFetchApplicationsQuery()
    const companyData = data?.[0]

    const renderStatus = (status: string) => {
        if (status === 'TO_DO') {
            return ({
                icon: <CheckCircleOutlineIcon />,
                backgroundColor: '#F5F9EE',
                color: '#00AA55',
                iconColor: 'confirmed' as StatusTagIcon['type']
            })
        } else if (status === 'FAILED') {
            return ({
                icon: <LoopIcon />,
                backgroundColor: '#F4FBFD',
                color: '#0D61AE',
                iconColor: 'label' as StatusTagIcon['type']
            })
        } else {
            return ({
                icon: <PendingOutlinedIcon />,
                backgroundColor: '#FFF7EC',
                color: '#975B27',
                iconColor: 'pending' as StatusTagIcon['type']
            })
        }

    }

    return (
        <div className={'company-detail-overlay'}>
            <Dialog
                open={openDialog}
                additionalModalRootStyles={{
                    width: '50%',
                }}
            >
                <DialogHeader
                    title={t('content.registrationInreview.title')}
                />
                <DialogContent
                    sx={{
                        padding: '0 120px',
                        marginBottom: 5,
                    }}
                >
                    <div className="registration-review">
                        <Trans>
                            <Typography variant="body1" className='description'>
                                {t('content.registrationInreview.description')}
                            </Typography>
                        </Trans>
                        <Trans
                            values={{ step: 3, date: '10-01-2024' }}
                        >
                            <Typography variant="h5" className="stepTitle">
                                {t('content.registrationInreview.stageTitle')}
                            </Typography>
                            <Typography variant="caption3" className="lastUpdated">
                                {t('content.registrationInreview.lastUpdate')}
                            </Typography>
                        </Trans>
                        <ul className="statusList">
                            {
                                companyData?.applicationChecklist.map((checklist: ApplicationChecklist) => (
                                    <li
                                        key={uniqueId(checklist.statusId)}
                                        style={{ backgroundColor: renderStatus(checklist.statusId).backgroundColor }}
                                    >
                                        <div 
                                            style={{ color: renderStatus(checklist.statusId).color }}
                                            className="icon"
                                        >
                                            {renderStatus(checklist.statusId).icon}
                                        </div>
                                        <div
                                            className='statusLabel'
                                        >
                                            <Typography variant="label3">
                                                {t(`content.registrationInreview.steps.${checklist.typeId}`)}
                                            </Typography>
                                        </div>
                                        <StatusTag
                                            color={renderStatus(checklist.statusId).iconColor}
                                            label={ t(`content.registrationInreview.status.${checklist.statusId}`) }
                                            size='small'
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </DialogContent>
                <DialogActions helperText={t('content.registrationInreview.helperText')}>
                    <Button
                        variant="contained"
                        size='small'
                        onClick={handleOverlayClose}
                    >
                        {t('global.actions.close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RegistrationReviewOverlay
