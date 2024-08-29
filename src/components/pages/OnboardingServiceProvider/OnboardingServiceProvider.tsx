/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { type SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Typography,
  IconButton,
  Tabs,
  Tab,
  TabPanel,
  PageLoadingTable,
  DialogActions,
  Button,
  DialogHeader,
  DialogContent,
  Dialog,
  LoadingButton,
} from '@catena-x/portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box } from '@mui/material'
import './OnboardingServiceProvider.scss'
import { IDPList } from '../IDPManagement/IDPList'
import {
  type networkCompany,
  type OIDCSignatureAlgorithm,
  type RegistartionStatusCallbackType,
  useFetchCompaniesListQuery,
  useFetchRegistartionStatusCallbackQuery,
  useUpdateRegistartionStatusCallbackMutation,
} from 'features/admin/idpApiSlice'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import { isIDPClientID, isIDPClientSecret, isURL } from 'types/Patterns'
import { InputType } from 'components/shared/basic/Input/BasicInput'
import { type IHashMap } from 'types/MainTypes'
import { success } from 'services/NotifyService'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const OnboardingServiceProvider = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<number>(0)
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { data } = useFetchRegistartionStatusCallbackQuery()
  const [loading, setLoading] = useState(false)
  const [updateRegistartionStatusCallback] =
    useUpdateRegistartionStatusCallbackMutation()
  const [formData, setFormData] = useState<IHashMap<string>>({})
  const [showError, setShowError] = useState(false)
  const [idpUpdateData, setIdpUpdateData] = useState<
    RegistartionStatusCallbackType | undefined
  >(undefined)

  const handleTabChange = (
    _e: SyntheticEvent<Element, Event>,
    value: number
  ) => {
    setActiveTab(value)
  }

  const getTabsIcon = (step: number) => {
    return (
      <Typography
        variant="label3"
        sx={{
          background: activeTab + 1 === step ? '#0f71cb' : 'white',
          color: activeTab + 1 === step ? 'white' : '#0f71cb',
          outline: '2px solid #0f71cb',
          flex: '0',
          marginRight: '20px',
          borderRadius: '50%',
          height: '20px',
          width: '20px',
          minWidth: '20px',
          textAlign: 'center',
          lineHeight: '20px',
          position: 'relative',
        }}
      >
        {step}
      </Typography>
    )
  }

  const isWellknownMetadata = (expr: string) =>
    isURL(expr) && expr.endsWith('.well-known/openid-configuration')

  const doUpdateIDP = async () => {
    if (!(data && idpUpdateData)) return
    console.log('idpUpdateData', idpUpdateData)
    setLoading(true)
    try {
      await updateRegistartionStatusCallback(idpUpdateData).unwrap()
      success(t('content.onboardingServiceProvider.success'))
      setOverlayOpen(false)
    } catch (err) {
      setShowError(true)
    }
    setLoading(false)
  }

  const checkData = (key: string, value: string | undefined): boolean => {
    const current: IHashMap<string> = { ...formData }
    current[key] = value as OIDCSignatureAlgorithm
    setFormData(current)
    const formValid =
      current.callbackUrl && current.clientId && current.clientSecret
    setIdpUpdateData(
      formValid
        ? {
            callbackUrl: current.callbackUrl,
            clientId: current.clientId,
            clientSecret: current.clientSecret,
            authUrl: '',
          }
        : undefined
    )
    return true
  }

  return (
    <main className="onboarding-service-page-container ">
      <section>
        <Dialog
          open={overlayOpen}
          additionalModalRootStyles={{
            width: '60%',
          }}
        >
          <DialogHeader
            title={t('content.onboardingServiceProvider.dialogTitle')}
            intro={
              <Box
                sx={{
                  textAlign: 'center',
                  margin: '50px auto 20px',
                  display: 'grid',
                }}
              ></Box>
            }
            closeWithIcon={true}
            onCloseWithIcon={() => {
              setOverlayOpen(false)
            }}
          />
          <DialogContent
            sx={{
              padding: '0px 120px 40px 120px',
            }}
          >
            <>
              <div style={{ marginTop: '34px' }}>
                <ValidatingInput
                  name="callbackUrl"
                  label={t(
                    'content.onboardingServiceProvider.callbackUrl.name'
                  )}
                  value={data?.callbackUrl}
                  validate={(expr) => isWellknownMetadata(expr)}
                  hint={t('content.onboardingServiceProvider.callbackUrl.hint')}
                  debounceTime={0}
                  onValid={checkData}
                />
              </div>
              <div style={{ margin: '12px 0' }}>
                <ValidatingInput
                  name="clientId"
                  label={t('content.onboardingServiceProvider.clientId.name')}
                  value={data?.clientId}
                  hint={t('content.onboardingServiceProvider.clientId.hint')}
                  validate={isIDPClientID}
                  onValid={checkData}
                />
              </div>
              <div style={{ margin: '12px 0 30px' }}>
                <ValidatingInput
                  name="clientSecret"
                  label={t(
                    'content.onboardingServiceProvider.clientSecret.name'
                  )}
                  value={data?.clientSecret}
                  hint={t(
                    'content.onboardingServiceProvider.clientSecret.hint'
                  )}
                  type={InputType.password}
                  validate={isIDPClientSecret}
                  onValid={checkData}
                />
              </div>
              {showError && (
                <Typography
                  variant="label3"
                  sx={{
                    display: 'flex',
                    marginTop: '30px',
                    color: '#d91e18',
                    border: '1px solid #d91e18',
                    padding: '20px 40px',
                    borderRadius: '5px',
                  }}
                >
                  <WarningAmberIcon
                    sx={{
                      marginRight: '5px',
                      fontSize: '18px',
                    }}
                  />
                  {t('content.onboardingServiceProvider.callbackUrlError')}
                </Typography>
              )}
            </>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                setOverlayOpen(false)
              }}
            >
              {t('global.actions.close')}
            </Button>

            {loading ? (
              <LoadingButton
                color="primary"
                size="medium"
                helperText=""
                helperTextColor="success"
                label=""
                loading
                loadIndicator={t('global.actions.loading')}
                onButtonClick={() => {
                  // do nothing
                }}
                sx={{ marginLeft: '10px' }}
              />
            ) : (
              <Button
                variant="contained"
                onClick={doUpdateIDP}
                disabled={!idpUpdateData}
              >
                {t('global.actions.confirm')}
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <div className="onboarding-service-header">
          <Typography variant="h2" className="onboarding-service-title">
            {t('content.onboardingServiceProvider.headertitle')}
          </Typography>
          <Typography variant="body2" className="onboarding-service-desc">
            {t('content.onboardingServiceProvider.desc')}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '50%',
              background: '#F4FBFD',
              margin: 'auto',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body3">
                {t('content.onboardingServiceProvider.subDesc1')}
              </Typography>
              <Typography variant="body3">
                {t('content.onboardingServiceProvider.subDesc2')}
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={() => {
                setOverlayOpen(true)
              }}
              sx={{
                right: '0',
                position: 'absolute',
                top: '50%',
                msTransform: 'translateY(-50%)',
                transform: 'translateY(-50%)',
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </div>
      </section>

      <Box>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ margin: '0 10% 20px' }}
        >
          <Tab
            iconPosition="start"
            icon={getTabsIcon(1)}
            aria-controls={`simple-tabpanel-${activeTab}`}
            id={`simple-tab-${activeTab}`}
            label={t('content.onboardingServiceProvider.tabletitle1')}
            sx={{
              textTransform: 'none',
              display: 'inline-flex',
              width: '100%',
              maxWidth: '550px',
              '&.Mui-selected': {
                borderBottom: '3px solid #0f71cb',
              },
            }}
          />
          <Tab
            iconPosition="start"
            icon={getTabsIcon(2)}
            aria-controls={`simple-tabpanel-${activeTab}`}
            id={`simple-tab-${activeTab}`}
            label={t('content.onboardingServiceProvider.tabletitle2')}
            sx={{
              textTransform: 'none',
              display: 'inline-flex',
              width: '100%',
              maxWidth: '550px',
              '&.Mui-selected': {
                borderBottom: '3px solid #0f71cb',
              },
            }}
          />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <div className="connector-table-container">
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h5" sx={{ mr: 5 }}>
                {t('content.onboardingServiceProvider.userList')}
              </Typography>
              <Button
                size="small"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => dispatch(show(OVERLAYS.ADD_IDP))}
                className="add-idp-btn"
              >
                {t('content.onboardingServiceProvider.addIdentityProvider')}
              </Button>
            </Box>
            <IDPList isManagementOSP={true} />
          </div>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <div className="connector-table-container">
            <PageLoadingTable<networkCompany, { expr: string }>
              toolbarVariant="premium"
              title={t('content.onboardingServiceProvider.tabletitle2')}
              loadLabel={t('global.actions.more')}
              fetchHook={useFetchCompaniesListQuery}
              getRowId={(row: { [key: string]: string }) =>
                row.applicationStatus
              }
              columns={[
                {
                  field: 'companyName',
                  headerName: t(
                    'content.onboardingServiceProvider.table.customerName'
                  ),
                  flex: 1,
                  sortable: false,
                },
                {
                  field: 'applicationStatus',
                  headerName: t(
                    'content.onboardingServiceProvider.table.status'
                  ),
                  flex: 1,
                  sortable: false,
                },
                {
                  field: 'identityProvider',
                  headerName: t(
                    'content.onboardingServiceProvider.table.idpName'
                  ),
                  flex: 1,
                  sortable: false,
                  renderCell: ({ row }: { row: networkCompany }) =>
                    row?.identityProvider?.[0].alias,
                },
                {
                  field: 'activeUsers',
                  headerName: t(
                    'content.onboardingServiceProvider.table.users'
                  ),
                  flex: 1,
                  sortable: false,
                },
              ]}
            />
          </div>
        </TabPanel>
      </Box>
    </main>
  )
}

export default OnboardingServiceProvider
