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

import { useState, useEffect, useRef, type SyntheticEvent } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
  Button,
  Tabs,
  Tab,
  TabPanel,
  StatusTag,
  DropPreviewFile,
  UploadStatus,
  DialogActions,
} from '@catena-x/portal-shared-components'
import { Box, useTheme, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { adminRegistrationSelector } from 'features/admin/registration/slice'
import {
  type ApplicationRequest,
  useFetchCheckListDetailsQuery,
} from 'features/admin/applicationRequestApiSlice'
import { download } from 'utils/downloadUtils'
import CheckListFullButtons from '../components/CheckList/CheckListFullButtons'
import { getTitle } from './CompanyDetailsHelper'
import { useFetchNewDocumentByIdMutation } from 'features/appManagement/apiSlice'
import { KeyValueView } from 'components/shared/basic/KeyValueView'
import { type UniqueIdType } from 'features/admin/registration/types'

interface CompanyDetailOverlayProps {
  openDialog?: boolean
  selectedRequest?: ApplicationRequest
  selectedRequestId?: string
  handleOverlayClose: React.MouseEventHandler
}

const CompanyDetailOverlay = ({
  openDialog = false,
  selectedRequest,
  selectedRequestId,
  handleOverlayClose,
}: CompanyDetailOverlayProps) => {
  const modalElement = useRef<HTMLInputElement>()
  const { t } = useTranslation()
  const theme = useTheme()
  const { detailLoading, companyDetail: selectedCompany } = useSelector(
    adminRegistrationSelector
  )
  const [company, setCompany] = useState<ApplicationRequest>()
  const [getDocumentById] = useFetchNewDocumentByIdMutation()
  const [activeTab, setActiveTab] = useState<number>(0)
  const [height, setHeight] = useState<string>('')
  const { data: checklistData } =
    useFetchCheckListDetailsQuery(selectedRequestId)

  useEffect(() => {
    if (selectedRequest) setCompany(selectedRequest)
  }, [selectedRequest])

  const getLocaleStr = (str: string) => {
    if (str === 'ACTIVE_PARTICIPANT') {
      return t(
        'content.admin.registration-requests.overlay.activeParticipation'
      )
    } else if (str === 'APP_PROVIDER') {
      return t('content.admin.registration-requests.overlay.appProvider')
    } else if (str === 'ONBOARDING_SERVICE_PROVIDER') {
      return t('content.admin.registration-requests.overlay.onboardingProvider')
    } else {
      return t('content.admin.registration-requests.overlay.serviceProvider')
    }
  }

  const downloadDocument = async (documentId: string, documentType: string) => {
    if (!company) return
    try {
      const response = await getDocumentById(documentId).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data

      download(file, fileType, documentType)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const getUniqueIdName = (id: { type: string; value: string }) => {
    switch (id.type) {
      case 'COMMERCIAL_REG_NUMBER':
        return t(
          'content.admin.registration-requests.overlay.commercialRegisterNumber'
        )
      case 'VAT_ID':
        return t('content.admin.registration-requests.overlay.vatId')
      case 'LEI_CODE':
        return t('content.admin.registration-requests.overlay.leiCode')
      case 'VIES':
        return t('content.admin.registration-requests.overlay.vies')
      case 'EORI':
        return t('content.admin.registration-requests.overlay.eori')
    }
  }

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setHeight(
      modalElement?.current
        ? `${modalElement?.current?.clientHeight}px`
        : '400px'
    )
    setActiveTab(newValue)
  }

  const getStepIcon = (step: string) => {
    return (
      <Typography
        variant="label3"
        sx={{
          background: '#0f71cb',
          color: 'white',
          flex: '0',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          minWidth: '20px',
          textAlign: 'center',
          lineHeight: '20px',
          marginRight: '20px',
          position: 'relative',
        }}
      >
        {step}
      </Typography>
    )
  }

  const companyData = [
    {
      key: t('content.partnernetwork.columns.name'),
      value: selectedCompany?.name ?? '',
    },
    {
      key: t('content.partnernetwork.columns.bpn'),
      value: selectedCompany?.bpn ?? '',
    },
    {
      key: t('content.partnernetwork.columns.street'),
      value: selectedCompany?.streetName + ' ' + selectedCompany?.streetNumber,
    },
    {
      key: t('content.partnernetwork.columns.contact'),
      value: selectedCompany?.companyUser?.[0].email ?? '',
    },
    {
      key: t('content.partnernetwork.columns.uniqueid'),
      value: selectedCompany?.uniqueIds?.map(
        (uniqueId: UniqueIdType) =>
          getUniqueIdName(uniqueId) + ' - ' + uniqueId.value
      ),
    },
  ]

  const documentData = [
    {
      key: '',
      value: (
        <>
          {company?.documents && company.documents.length > 0 ? (
            <>
              {company.documents.map(
                (contract: { documentId: string; documentType: string }) => (
                  <Box key={contract.documentId}>
                    <DropPreviewFile
                      uploadFile={{
                        name: contract?.documentType,
                        status: UploadStatus.UPLOAD_SUCCESS,
                      }}
                      translations={{
                        placeholder: '',
                        uploadProgress: '',
                        uploadSuccess: '',
                        uploadError: '',
                      }}
                      onDownload={() => {
                        void downloadDocument(
                          contract.documentId,
                          contract.documentType
                        )
                      }}
                      enableDeleteIcon={false}
                    />
                  </Box>
                )
              )}
            </>
          ) : (
            <Typography
              sx={{
                padding: '20px',
              }}
              variant="body1"
            >
              {t('content.admin.registration-requests.overlay.noinfo')}
            </Typography>
          )}
        </>
      ),
    },
  ]

  const companyRoleData = [
    {
      key: '',
      value: (
        <>
          {selectedCompany?.companyRoles?.map(
            (role: { companyRole: string }) => (
              <StatusTag
                key={role.companyRole}
                color="label"
                label={getLocaleStr(role.companyRole)}
                sx={{
                  marginRight: '8px',
                }}
              />
            )
          )}
        </>
      ),
    },
  ]

  return (
    <div className={'company-detail-overlay'}>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: 700,
          },
        }}
      >
        <DialogHeader
          {...{
            title: getTitle(activeTab, checklistData ?? [], t),
            closeWithIcon: true,
            onCloseWithIcon: handleOverlayClose,
          }}
        >
          <>
            {activeTab === 0 && (
              <Trans
                i18nKey={t(
                  'content.admin.registration-requests.overlay.tab1SubTitle'
                )}
                values={{
                  status: 'in progress',
                }}
              >
                <Typography variant="h6">
                  {t(
                    'content.admin.registration-requests.overlay.tab1SubTitle'
                  )}
                </Typography>
              </Trans>
            )}
            <Box
              sx={{
                marginLeft: '60px',
              }}
            >
              <Tabs value={activeTab} onChange={handleChange}>
                <Tab
                  icon={getStepIcon('1')}
                  iconPosition="start"
                  sx={{
                    fontSize: '18px',
                    width: '50%',
                    '&.Mui-selected': {
                      borderBottom: '3px solid #0f71cb',
                    },
                  }}
                  label={t('content.admin.registration-requests.overlay.tab1')}
                  id={`simple-tab-${activeTab}`}
                  aria-controls={`simple-tabpanel-${activeTab}`}
                />
                <Tab
                  icon={getStepIcon('2')}
                  iconPosition="start"
                  sx={{
                    fontSize: '18px',
                    '&.Mui-selected': {
                      borderBottom: '3px solid #0f71cb',
                    },
                  }}
                  label={t('content.admin.registration-requests.overlay.tab2')}
                  id={`simple-tab-${activeTab}`}
                  aria-controls={`simple-tabpanel-${activeTab}`}
                />
              </Tabs>
            </Box>
          </>
        </DialogHeader>

        {detailLoading ? (
          <div
            style={{
              height: '100px',
              textAlign: 'center',
              padding: '30px',
            }}
          >
            <CircularProgress
              size={35}
              sx={{
                color: theme.palette.primary.main,
                zIndex: 1,
                position: 'absolute',
              }}
            />
          </div>
        ) : (
          <DialogContent
            sx={{
              padding: '0 120px',
              marginBottom: 5,
            }}
          >
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ width: '100%', marginBottom: '50px' }}>
                <KeyValueView
                  cols={2.3}
                  title={t(
                    'content.admin.registration-requests.overlay.companydatatitle'
                  )}
                  items={companyData}
                />
              </Box>
              <Box ref={modalElement} sx={{ width: '100%' }}>
                <KeyValueView
                  cols={2.3}
                  title={t('content.admin.registration-requests.overlay.docs')}
                  items={documentData}
                />
                <KeyValueView
                  cols={2.3}
                  title={t('content.admin.registration-requests.overlay.roles')}
                  items={companyRoleData}
                />
              </Box>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ width: '100%', height }}>
                <CheckListFullButtons progressButtons={checklistData} />
              </Box>
            </TabPanel>
          </DialogContent>
        )}
        <DialogActions>
          <Button variant="contained" onClick={handleOverlayClose}>
            {t('global.actions.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CompanyDetailOverlay
