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

import {
  Button,
  Card,
  Checkbox,
  IconButton,
  LanguageSwitch,
  LogoGrayData,
  PageNotifications,
  StaticTable,
  Typography,
  TableType,
} from 'cx-portal-shared-components'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Grid, Divider, Box, InputLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment } from 'features/appManagement/slice'
import {
  ConsentStatusEnum,
  DocumentData,
} from 'features/appManagement/apiSlice'
import i18next, { changeLanguage } from 'i18next'
import I18nService from 'services/I18nService'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CommonService from 'services/CommonService'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import { DocumentTypeText } from 'features/apps/apiSlice'
import { download } from 'utils/downloadUtils'
import { AppStatusDataState, UseCaseType } from 'features/appManagement/types'
import { ServiceStatusDataState } from 'features/serviceManagement/types'
import { ReleaseProcessTypes } from 'features/serviceManagement/apiSlice'
import {
  serviceReleaseStepDecrement,
  serviceReleaseStepIncrement,
} from 'features/serviceManagement/slice'

export interface DefaultValueType {
  images: Array<string>
  connectedTableData: TableType
  dataSecurityInformation: string
  conformityDocumentsDescription: string
  documentsDescription: string
  providerTableData: TableType
  cxTestRuns: []
}
interface CommonValidateAndPublishType {
  stepperHeader: string
  stepperDescription: string
  statusData: AppStatusDataState | ServiceStatusDataState | undefined
  id: string
  fetchDocumentById: (obj: { appId: string; documentId: string }) => any
  showSubmitPage: (val: boolean) => void
  submitData: (id: string) => any
  validateAndPublishItemText?: string
  detailsText: string
  longDescriptionTitleEN: string
  longDescriptionTitleDE: string
  connectedData: string
  conformityDocument: string
  dataSecurityInformation: string
  documentsTitle: string
  providerInformation: string
  consentTitle: string
  cxTestRunsTitle: string
  error: { title: string; message: string }
  helpText: string
  submitButton: string
  values: DefaultValueType | any
  type: ReleaseProcessTypes.APP_RELEASE | ReleaseProcessTypes.SERVICE_RELEASE
}

export default function CommonValidateAndPublish({
  stepperHeader,
  stepperDescription,
  statusData,
  id,
  fetchDocumentById,
  showSubmitPage,
  submitData,
  validateAndPublishItemText,
  detailsText,
  longDescriptionTitleEN,
  longDescriptionTitleDE,
  connectedData,
  conformityDocument,
  dataSecurityInformation,
  documentsTitle,
  providerInformation,
  consentTitle,
  cxTestRunsTitle,
  error,
  helpText,
  submitButton,
  values,
  type,
}: CommonValidateAndPublishType) {
  const dispatch = useDispatch()
  const [validatePublishNotification, setValidatePublishNotification] =
    useState(false)
  const [cardImage, setCardImage] = useState('')
  const [multipleImages, setMultipleImages] = useState<any[]>([])
  const [defaultValues, setDefaultValues] = useState<DefaultValueType>()

  const fetchImage = useCallback(
    async (documentId: string, documentType: string) => {
      try {
        const response = await fetchDocumentById({
          appId: id,
          documentId,
        }).unwrap()
        const file = response.data
        if (documentType === 'APP_LEADIMAGE') {
          return setCardImage(URL.createObjectURL(file))
        }
      } catch (error) {
        console.error(error, 'ERROR WHILE FETCHING IMAGE')
      }
    },
    [fetchDocumentById, id]
  )

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    if (
      statusData?.documents?.APP_LEADIMAGE &&
      statusData?.documents?.APP_LEADIMAGE[0].documentId
    ) {
      fetchImage(
        statusData?.documents?.APP_LEADIMAGE[0].documentId,
        'APP_LEADIMAGE'
      )
    }
    if (
      statusData?.documents?.APP_IMAGE &&
      statusData?.documents?.APP_IMAGE[0].documentId
    ) {
      const newPromies = CommonService.fetchLeadPictures(
        statusData?.documents?.APP_IMAGE,
        id
      )
      Promise.all(newPromies).then((result) => {
        setMultipleImages(result.flat())
      })
    }
    setDefaultValues(values)
    reset(values)
  }, [statusData, values, fetchImage, reset, id])

  const handleDownloadFn = async (documentId: string, documentName: string) => {
    try {
      const response = await fetchDocumentById({
        appId: id,
        documentId,
      }).unwrap()

      const fileType = response.headers.get('content-type')
      const file = response.data

      return download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const onValidatePublishSubmit = async (data: any) => {
    try {
      await submitData(id).unwrap()
      if (type === ReleaseProcessTypes.APP_RELEASE) {
        dispatch(increment())
      } else {
        dispatch(serviceReleaseStepIncrement())
      }
      showSubmitPage(true)
    } catch (error: any) {
      setValidatePublishNotification(true)
    }
  }

  const getAppData = (item: string) => {
    if (item === 'language')
      return (
        statusData?.supportedLanguageCodes &&
        statusData?.supportedLanguageCodes.join(', ')
      )
    else if (item === 'useCase')
      return (
        statusData?.useCase &&
        statusData?.useCase?.map((item: UseCaseType) => item.label).join(', ')
      )
    else if (item === 'price') return statusData?.price
  }

  return (
    <div className="validate-and-publish">
      <ReleaseStepHeader
        title={stepperHeader}
        description={stepperDescription}
      />
      <div className="header-description">
        <Grid container sx={{ mt: 0 }}>
          <Grid
            item
            className={'verify-app-release-card'}
            sx={{ ml: 0, mr: 0 }}
            md={4}
          >
            <Card
              image={{
                src: cardImage || LogoGrayData,
              }}
              title={statusData?.title || ''}
              subtitle={statusData?.provider}
              description={
                statusData?.descriptions?.filter(
                  (lang: { languageCode: string }) =>
                    lang.languageCode === i18next.language
                )[0]?.shortDescription
              }
              imageSize="normal"
              imageShape="square"
              variant="text-details"
              expandOnHover={false}
              filledBackground={true}
              buttonText={''}
            />
            <div style={{ margin: '35px auto -16px 65px' }}>
              <LanguageSwitch
                current={i18next.language}
                languages={I18nService.supportedLanguages.map((key) => ({
                  key,
                }))}
                onChange={changeLanguage}
              />
            </div>
          </Grid>
          {type === ReleaseProcessTypes.APP_RELEASE && (
            <Grid item sx={{ paddingLeft: '71px', marginTop: '22%' }} md={8}>
              {['language', 'useCase', 'price'].map((item, i) => (
                <div
                  style={{ display: 'flex', marginBottom: '5px' }}
                  key={item}
                >
                  <Typography variant="body2">
                    <b>{`${validateAndPublishItemText}.${item}`}</b>
                    {getAppData(item)}
                  </Typography>
                </div>
              ))}
            </Grid>
          )}
        </Grid>

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {detailsText}
        </Typography>
        {['longDescriptionEN', 'longDescriptionDE'].map((item, i) => (
          <div key={item}>
            {item === 'longDescriptionEN' ? (
              <Typography variant="body2" className="form-field">
                <span style={{ fontWeight: 'bold' }}>
                  {longDescriptionTitleEN}
                </span>
                {
                  statusData?.descriptions?.filter(
                    (lang: { languageCode: string }) =>
                      lang.languageCode === 'en'
                  )[0]?.longDescription
                }
              </Typography>
            ) : (
              <Typography variant="body2" className="form-field">
                <span style={{ fontWeight: 'bold' }}>
                  {longDescriptionTitleDE}
                </span>
                {
                  statusData?.descriptions?.filter(
                    (lang: { languageCode: string }) =>
                      lang.languageCode === 'de'
                  )[0]?.longDescription
                }
              </Typography>
            )}
          </div>
        ))}
        {multipleImages && (
          <div style={{ display: 'flex' }}>
            {multipleImages?.map((img: { url: string }, i: number) => {
              return (
                <Box sx={{ margin: '37px auto 0 auto' }} key={img.url}>
                  <img
                    src={img.url}
                    alt={'images'}
                    className="verify-validate-images"
                  />
                </Box>
              )
            })}
          </div>
        )}

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {connectedData}
        </Typography>
        {defaultValues && (
          <StaticTable
            data={defaultValues.connectedTableData}
            horizontal={false}
          />
        )}
        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {conformityDocument}
        </Typography>
        {defaultValues && (
          <Typography variant="body2" className="form-field">
            {defaultValues.conformityDocumentsDescription}
          </Typography>
        )}
        {statusData?.documents &&
          statusData.documents[
            DocumentTypeText.CONFORMITY_APPROVAL_BUSINESS_APPS
          ] &&
          statusData.documents[
            DocumentTypeText.CONFORMITY_APPROVAL_BUSINESS_APPS
          ].map((item: DocumentData) => (
            <InputLabel sx={{ mb: 0, mt: 3 }} key={item.documentId}>
              <button
                style={{
                  display: 'flex',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#0f71cb',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
                onClick={() =>
                  handleDownloadFn(item.documentId, item.documentName)
                }
              >
                <ArrowForwardIcon fontSize="small" />
                {item.documentName}
              </button>
            </InputLabel>
          ))}

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {dataSecurityInformation}
        </Typography>
        {defaultValues && (
          <Typography variant="body2" className="form-field">
            {defaultValues.dataSecurityInformation}
          </Typography>
        )}
        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {documentsTitle}
        </Typography>
        {defaultValues && (
          <Typography variant="body2" className="form-field">
            {defaultValues.documentsDescription}
          </Typography>
        )}
        {statusData?.documents &&
          Object.keys(statusData.documents).map((item, i) => (
            <InputLabel sx={{ mb: 0, mt: 3 }} key={item}>
              <a href="/" style={{ display: 'flex' }}>
                <ArrowForwardIcon fontSize="small" />
                {statusData.documents[item][0].documentName}
              </a>
            </InputLabel>
          ))}

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {providerInformation}
        </Typography>
        {defaultValues && (
          <StaticTable
            data={defaultValues.providerTableData}
            horizontal={true}
          />
        )}
        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {consentTitle}
        </Typography>
        <div className="form-field">
          {statusData?.agreements &&
            statusData?.agreements?.map(
              (item: { name: string; consentStatus: ConsentStatusEnum }) => (
                <div key={item.name}>
                  <Checkbox
                    key={item.name}
                    label={item.name}
                    checked={item.consentStatus === ConsentStatusEnum.ACTIVE}
                    disabled
                  />
                </div>
              )
            )}
        </div>

        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {cxTestRunsTitle}
        </Typography>
        {defaultValues && (
          <div className="form-field">
            {defaultValues.cxTestRuns &&
              defaultValues.cxTestRuns?.map((item: any, index: number) => (
                <div key={item.name}>
                  <Checkbox
                    key={item.name}
                    label={item.name}
                    checked={item.consentStatus === ConsentStatusEnum.ACTIVE}
                    disabled
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      <Box mb={2}>
        {validatePublishNotification && (
          <Grid container xs={12} sx={{ mb: 2 }}>
            <Grid xs={6}></Grid>
            <Grid xs={6}>
              <PageNotifications
                title={error.title}
                description={error.message}
                open
                severity="error"
                onCloseNotification={() =>
                  setValidatePublishNotification(false)
                }
              />
            </Grid>
          </Grid>
        )}

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          startIcon={<HelpOutlineIcon />}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          {helpText}
        </Button>
        <IconButton
          color="secondary"
          onClick={() =>
            type === ReleaseProcessTypes.APP_RELEASE
              ? dispatch(decrement())
              : dispatch(serviceReleaseStepDecrement())
          }
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          onClick={handleSubmit(onValidatePublishSubmit)}
          variant="contained"
          disabled={!isValid}
          sx={{ float: 'right' }}
        >
          {submitButton}
        </Button>
      </Box>
    </div>
  )
}
