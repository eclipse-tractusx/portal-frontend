/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { useState, useEffect, useRef, type SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
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
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import { Box, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { adminRegistrationSelector } from 'features/admin/registration/slice'
import {
  type ApplicationRequest,
  useFetchCheckListDetailsQuery,
} from 'features/admin/applicationRequestApiSlice'
import { download } from 'utils/downloadUtils'
import CheckListFullButtons from '../CheckList/CheckListFullButtons'
import { getIntro, getTitle } from './CompanyDetailsHelper'
import { useFetchNewDocumentByIdMutation } from 'features/appManagement/apiSlice'
import { type UniqueIdType } from 'features/admin/registration/types'
import { StatusProgress } from '../RegistrationTableColumns'

interface CompanyDetailOverlayProps {
  openDialog?: boolean
  selectedRequest?: ApplicationRequest
  selectedRequestId?: string
  selectedActiveTab?: number
  handleOverlayClose: React.MouseEventHandler
}

const CompanyDetailOverlay = ({
  openDialog = false,
  selectedRequest,
  selectedRequestId,
  selectedActiveTab,
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
  const [activeTab, setActiveTab] = useState<number>(selectedActiveTab ?? 0)
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
      value: selectedCompany?.companyUser?.[0]?.email ?? '',
    },
    {
      key: t('content.partnernetwork.columns.uniqueid'),
      value:
        selectedCompany?.uniqueIds?.map(
          (uniqueId: UniqueIdType) =>
            getUniqueIdName(uniqueId) + ' - ' + uniqueId.value
        ) ?? [],
    },
  ]

  const documentData = [
    {
      key: '',
      value: (
        <>
          {selectedCompany?.documents &&
          selectedCompany.documents.length > 0 ? (
            <>
              {selectedCompany.documents.map(
                (contract: {
                  documentId: string
                  documentType: string
                  documentSize?: number
                }) => (
                  <Box key={contract.documentId}>
                    <div className={'doc-item'}>
                      <DropPreviewFile
                        uploadFile={{
                          name: contract?.documentType,
                          status: UploadStatus.UPLOAD_SUCCESS,
                          size: contract?.documentSize,
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
                    </div>
                  </Box>
                )
              )}
            </>
          ) : (
            <Typography sx={{ padding: '20px' }} variant="body3">
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
          {selectedCompany?.companyRoles?.length > 0 ? (
            selectedCompany?.companyRoles?.map(
              (role: { companyRole: string }) => (
                <StatusTag
                  key={role.companyRole}
                  color="label"
                  label={getLocaleStr(role.companyRole)}
                  sx={{
                    marginRight: '10px',
                  }}
                />
              )
            )
          ) : (
            <Typography sx={{ padding: '20px' }} variant="body3">
              {t(
                'content.admin.registration-requests.overlay.noRolesAvailable'
              )}
            </Typography>
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
            title: getTitle(activeTab, t, selectedRequest),
            intro: getIntro(activeTab, selectedCompany, t),
            closeWithIcon: true,
            onCloseWithIcon: handleOverlayClose,
          }}
        >
          <Box
            sx={{
              width: '80%',
              margin: '0 auto',
            }}
          >
            <Tabs value={activeTab} onChange={handleChange}>
              <Tab
                icon={getStepIcon('1')}
                iconPosition="start"
                sx={{
                  fontSize: '14px',
                  width: '50%',
                  textTransform: 'capitalize',
                  color: '#111 !important',
                  '&.Mui-selected': {
                    borderBottom: '3px solid #0f71cb',
                  },
                }}
                label={t('content.admin.registration-requests.overlay.tab1')}
                id={`simple-tab-${activeTab}`}
                aria-controls={`simple-tabpanel-${activeTab}`}
              />
              <div className="div-container">
                {' '}
                <div className="tab-divider" />
              </div>
              <Tab
                icon={getStepIcon('2')}
                iconPosition="start"
                sx={{
                  fontSize: '14px',
                  width: activeTab ? '50%' : '42%',
                  textTransform: 'capitalize',
                  color: '#111 !important',
                  '&.Mui-selected': {
                    borderBottom: '3px solid #0f71cb',
                  },
                }}
                label={t('content.admin.registration-requests.overlay.tab2')}
                id={`simple-tab-${activeTab}`}
                aria-controls={`simple-tabpanel-${activeTab}`}
              />
              <>
                {selectedRequest && !activeTab && (
                  <StatusProgress
                    application={selectedRequest}
                    trans={t}
                    type={false}
                    isProgressOnly={true}
                  />
                )}
              </>
            </Tabs>
          </Box>
        </DialogHeader>

        {detailLoading ? (
          <div
            style={{
              height: '100px',
              textAlign: 'center',
              padding: '30px',
            }}
          >
            <CircleProgress
              size={35}
              variant="indeterminate"
              colorVariant="primary"
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
              padding: activeTab === 0 ? '30px 110px 56px 110px' : '0px 120px',
              width: '100%',
              marginBottom: activeTab ? 5 : 0,
            }}
          >
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ width: '100%' }} className={'company-details'}>
                <Typography className="title" variant="h4">
                  {t(
                    'content.admin.registration-requests.overlay.companydatatitle'
                  )}
                </Typography>
                {companyData?.map((detail) => (
                  <div className="detail" key={detail.key}>
                    <Typography variant="body2" className="detail-name">
                      {detail.key}
                    </Typography>
                    <div></div>
                    <Typography variant="label2" className="detail-text">
                      {detail.value}
                    </Typography>
                  </div>
                ))}
              </Box>
              <Box ref={modalElement} sx={{ width: '100%' }}>
                <Typography className="title" variant="h4">
                  {t('content.admin.registration-requests.overlay.docs')}
                </Typography>

                <div className="document-container">
                  {documentData?.map((detail) => (
                    <div key={detail.key}>{detail.value}</div>
                  ))}
                </div>
              </Box>
              <Box
                ref={modalElement}
                className={'role-details'}
                sx={{ width: '100%' }}
              >
                <Typography className="title" variant="h4">
                  {t('content.admin.registration-requests.overlay.roles')}
                </Typography>
                <div>{companyRoleData?.[0]?.value}</div>
              </Box>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <Box sx={{ width: '100%', height }}>
                {selectedRequest && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '30px',
                    }}
                  >
                    <StatusProgress
                      application={selectedRequest}
                      trans={t}
                      type={false}
                    />
                  </div>
                )}
                <CheckListFullButtons
                  progressButtons={checklistData}
                  selectedRequestId={selectedRequestId}
                />
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
