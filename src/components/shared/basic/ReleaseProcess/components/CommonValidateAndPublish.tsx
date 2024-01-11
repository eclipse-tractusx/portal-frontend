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
  type TableType,
  CircleProgress,
  CardHorizontal,
  ImageGallery,
  type ImageType,
} from '@catena-x/portal-shared-components'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Grid, Divider, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment } from 'features/appManagement/slice'
import {
  ConsentStatusEnum,
  type DocumentData,
  DocumentTypeId,
  type rolesType,
} from 'features/appManagement/apiSlice'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CommonService from 'services/CommonService'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import { DocumentTypeText } from 'features/apps/apiSlice'
import { download } from 'utils/downloadUtils'
import {
  AppOverviewTypes,
  type AppStatusDataState,
  type UseCaseType,
} from 'features/appManagement/types'
import type { ServiceStatusDataState } from 'features/serviceManagement/types'
import { ReleaseProcessTypes } from 'features/serviceManagement/apiSlice'
import {
  serviceReleaseStepDecrement,
  serviceReleaseStepIncrement,
} from 'features/serviceManagement/slice'
import { useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'
import { PrivacyPolicyType } from 'features/adminBoard/adminBoardApiSlice'
import { Apartment, Person, LocationOn, Web, Info } from '@mui/icons-material'
import '../../../../pages/AppDetail/components/AppDetailPrivacy/AppDetailPrivacy.scss'
import 'components/styles/document.scss'

export interface DefaultValueType {
  images: Array<string>
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
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  fetchDocumentById: (obj: { appId: string; documentId: string }) => any
  showSubmitPage?: (val: boolean) => void
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  submitData: (id: string) => any
  validateAndPublishItemText?: string
  detailsText: string
  longDescriptionTitleEN: string
  longDescriptionTitleDE: string
  conformityDocument?: string
  documentsTitle: string
  providerInformation: string
  consentTitle: string
  cxTestRunsTitle?: string
  error: { title: string; message: string }
  helpText: string
  submitButton: string
  helpUrl?: string
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  values: DefaultValueType | any
  type:
    | ReleaseProcessTypes.APP_RELEASE
    | ReleaseProcessTypes.SERVICE_RELEASE
    | AppOverviewTypes.APP_OVERVIEW_DETAILS
  serviceTypes?: string
  rolesData?: rolesType[]
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
  conformityDocument,
  documentsTitle,
  providerInformation,
  consentTitle,
  cxTestRunsTitle,
  error,
  helpText,
  submitButton,
  values,
  type,
  serviceTypes,
  rolesData,
  helpUrl,
}: CommonValidateAndPublishType) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [validatePublishNotification, setValidatePublishNotification] =
    useState(false)
  const [cardImage, setCardImage] = useState('')
  const [multipleImages, setMultipleImages] = useState<ImageType[]>([])
  const [defaultValues, setDefaultValues] = useState<DefaultValueType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [cardLanguage, setCardLanguage] = useState<string>('en')

  const fetchImage = useCallback(
    async (documentId: string) => {
      try {
        const response = await fetchDocumentById({
          appId: id,
          documentId,
        }).unwrap()
        const file = response.data
        setCardImage(URL.createObjectURL(file))
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
    defaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    if (
      statusData?.documents?.APP_LEADIMAGE &&
      statusData?.documents?.APP_LEADIMAGE[0].documentId
    ) {
      fetchImage(statusData?.documents?.APP_LEADIMAGE[0].documentId)
    }
    if (
      statusData?.documents?.SERVICE_LEADIMAGE &&
      statusData?.documents?.SERVICE_LEADIMAGE[0].documentId
    ) {
      fetchImage(statusData?.documents?.SERVICE_LEADIMAGE[0].documentId)
    }
    if (
      statusData?.documents?.APP_IMAGE &&
      statusData?.documents?.APP_IMAGE[0].documentId
    ) {
      setMultipleImages(
        CommonService.imagesAndAppidToImageType(
          statusData?.documents?.APP_IMAGE,
          id
        )
      )
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

      download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const onValidatePublishSubmit = async () => {
    setLoading(true)
    try {
      await submitData(id).unwrap()
      if (type === ReleaseProcessTypes.APP_RELEASE) {
        dispatch(increment())
      } else {
        dispatch(serviceReleaseStepIncrement())
      }
      if (showSubmitPage) showSubmitPage(true)
    } catch (error: unknown) {
      setValidatePublishNotification(true)
    }
    setLoading(false)
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

  const renderPrivacy = (policy: string) => {
    switch (policy) {
      case PrivacyPolicyType.COMPANY_DATA:
        return <Apartment className="policy-icon" />
      case PrivacyPolicyType.USER_DATA:
        return <Person className="policy-icon" />
      case PrivacyPolicyType.LOCATION:
        return <LocationOn className="policy-icon" />
      case PrivacyPolicyType.BROWSER_HISTORY:
        return <Web className="policy-icon" />
      case PrivacyPolicyType.NONE:
        return <Info className="policy-icon" />
      default:
        return <Apartment className="policy-icon" />
    }
  }

  const getTechUserData = (data: string[] | null) => {
    return data && data?.length > 0 ? (
      data?.map((role: string) => (
        <Grid spacing={2} container sx={{ margin: '0px' }} key={role}>
          <Grid xs={12} className="tech-user-data" item>
            <Typography variant="body2">* {role}</Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Grid container spacing={2} margin={'0px'}>
        <Typography
          variant="label3"
          className="not-available"
          style={{ width: '100%' }}
        >
          {t('global.errors.noTechnicalUserProfilesAvailable')}
        </Typography>
      </Grid>
    )
  }

  const renderConformityDocuments = () => {
    return (
      statusData?.documents &&
      statusData.documents[
        type === ReleaseProcessTypes.APP_RELEASE
          ? DocumentTypeText.CONFORMITY_APPROVAL_BUSINESS_APPS
          : DocumentTypeText.CONFORMITY_APPROVAL_SERVICES
      ].map((item: DocumentData) => (
        <li key={item.documentId} className="document-list doc-list">
          <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
          <button
            className="document-button-link"
            onClick={() => handleDownloadFn(item.documentId, item.documentName)}
          >
            {item.documentName}
          </button>
        </li>
      ))
    )
  }

  return (
    <div className="validate-and-publish">
      {type !== AppOverviewTypes.APP_OVERVIEW_DETAILS && (
        <ReleaseStepHeader
          title={stepperHeader}
          description={stepperDescription}
        />
      )}
      <div className="header-description">
        {type === ReleaseProcessTypes.APP_RELEASE && (
          <Grid container sx={{ mt: 0 }}>
            <Grid
              item
              className={'verify-app-release-card'}
              sx={{ ml: 0, mr: 0 }}
              md={4}
            >
              <Card
                image={{
                  src: cardImage ?? LogoGrayData,
                }}
                title={statusData?.title ?? ''}
                subtitle={statusData?.provider}
                description={
                  statusData?.descriptions?.filter(
                    (lang: { languageCode: string }) =>
                      lang.languageCode === cardLanguage
                  )[0]?.shortDescription
                }
                imageSize="normal"
                imageShape="square"
                variant="text-details"
                expandOnHover={false}
                filledBackground={true}
                buttonText={''}
              />
              <div className="language-switch">
                <LanguageSwitch
                  current={cardLanguage}
                  languages={[{ key: 'de' }, { key: 'en' }]}
                  onChange={(lang) => {
                    setCardLanguage(lang)
                  }}
                />
              </div>
            </Grid>

            <Grid item sx={{ paddingLeft: '71px', marginTop: '22%' }} md={8}>
              {['language', 'useCase', 'price'].map((item, i) => (
                <div
                  style={{ display: 'flex', marginBottom: '5px' }}
                  key={item}
                >
                  <Typography variant="body2">
                    <b>{t(`${validateAndPublishItemText}.${item}`)}</b>
                    {getAppData(item)}
                  </Typography>
                </div>
              ))}
            </Grid>
          </Grid>
        )}
        {type === ReleaseProcessTypes.SERVICE_RELEASE && (
          <CardHorizontal
            borderRadius={6}
            imageAlt="Service Card"
            imagePath={cardImage ?? LogoGrayData}
            label={''}
            buttonText=""
            onBtnClick={() => {
              // do nothing
            }}
            title={statusData?.title ?? ''}
            subTitle={serviceTypes ?? ''}
            description={''}
            backgroundColor="rgb(224, 225, 226)"
          />
        )}
        <Divider className="verify-validate-form-divider" />
        <Typography variant="h4" sx={{ mb: 4 }}>
          {detailsText}
        </Typography>
        {['longDescriptionEN', 'longDescriptionDE'].map((item, i) => (
          <div key={item}>
            {item === 'longDescriptionEN' ? (
              <Typography
                variant="body2"
                className="form-field"
                style={{ whiteSpace: 'pre-line' }}
              >
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
              <Typography
                variant="body2"
                className="form-field"
                style={{ whiteSpace: 'pre-line' }}
              >
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
        {multipleImages && <ImageGallery gallery={multipleImages} />}

        <Divider className="verify-validate-form-divider" />
        {statusData?.privacyPolicies && (
          <>
            <div
              className="appdetail-privacy"
              style={{ marginBottom: '0px', paddingTop: '0px' }}
            >
              <div className="privacy-content">
                <Typography variant="h4">
                  {t('content.appdetail.privacy.heading')}
                </Typography>
                <Typography variant="body2" className="form-field">
                  {t('content.appdetail.privacy.message')}
                </Typography>
              </div>
              {statusData?.privacyPolicies &&
              statusData?.privacyPolicies.length ? (
                <div className="policies-list app-policies">
                  {statusData?.privacyPolicies?.map((policy: string) => (
                    <Typography
                      variant="body2"
                      className="policy-name"
                      key={uniqueId(policy)}
                    >
                      {renderPrivacy(policy)}
                      {t(`content.appdetail.privacy.${policy}`)}
                    </Typography>
                  ))}
                </div>
              ) : (
                <Typography variant="body2" className="table-text">
                  {t('content.appdetail.privacy.notSupportedMessage')}
                </Typography>
              )}
            </div>
            <Divider className="verify-validate-form-divider" />
          </>
        )}

        {conformityDocument && (
          <>
            <Typography variant="h4">{conformityDocument}</Typography>
            {defaultValues && (
              <Typography variant="body2" className="form-field">
                {defaultValues.conformityDocumentsDescription}
              </Typography>
            )}
            {statusData?.documents &&
            statusData.documents[
              type === ReleaseProcessTypes.APP_RELEASE
                ? DocumentTypeText.CONFORMITY_APPROVAL_BUSINESS_APPS
                : DocumentTypeText.CONFORMITY_APPROVAL_SERVICES
            ] ? (
              renderConformityDocuments()
            ) : (
              <Typography variant="caption2" className="not-available">
                {t('global.errors.noDocumentsAvailable')}
              </Typography>
            )}
            <Divider className="verify-validate-form-divider" />
          </>
        )}

        <Typography variant="h4">{documentsTitle}</Typography>
        {defaultValues && (
          <Typography variant="body2" className="form-field">
            {defaultValues.documentsDescription}
          </Typography>
        )}
        {statusData?.documents &&
        Object.keys(statusData.documents)?.length &&
        (statusData?.documents.hasOwnProperty(
          DocumentTypeId.ADDITIONAL_DETAILS
        ) ||
          statusData?.documents.hasOwnProperty(DocumentTypeId.APP_CONTRACT) ||
          statusData?.documents.hasOwnProperty(
            DocumentTypeId.APP_TECHNICAL_INFORMATION
          )) ? (
          Object.keys(statusData.documents).map(
            (item) =>
              (item === DocumentTypeId.ADDITIONAL_DETAILS ||
                item === DocumentTypeId.APP_CONTRACT ||
                item === DocumentTypeId.APP_TECHNICAL_INFORMATION) && (
                <li key={item} className="document-list doc-list">
                  <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
                  <button
                    className="document-button-link"
                    onClick={() =>
                      handleDownloadFn(
                        statusData?.documents[item][0]?.documentId,
                        statusData?.documents[item][0]?.documentName
                      )
                    }
                  >
                    {statusData?.documents[item][0]?.documentName}
                  </button>
                </li>
              )
          )
        ) : (
          <Typography variant="caption2" className="not-available">
            {t('global.errors.noDocumentsAvailable')}
          </Typography>
        )}

        {rolesData && (
          <>
            <Divider className="verify-validate-form-divider" />
            <Typography variant="h4">
              {t('content.adminboardDetail.roles.heading')}
            </Typography>
            <Typography variant="body2" className="form-field">
              {t('content.adminboardDetail.roles.message')}
            </Typography>
            {rolesData.length > 0 ? (
              <Grid container spacing={2} sx={{ margin: '0px' }}>
                {rolesData?.map((role) => (
                  <Grid item xs={6} key={role.roleId} className="roles-data">
                    <Typography variant="label2">{role.role}</Typography>
                    <Typography variant="body3">{role.description}</Typography>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="caption2" className="not-available">
                {t('global.errors.noRolesAvailable')}
              </Typography>
            )}
          </>
        )}

        {statusData?.technicalUserProfile &&
          Object.values(statusData?.technicalUserProfile) && (
            <>
              <Divider className="verify-validate-form-divider" />
              <Typography variant="h4">
                {t('content.adminboardDetail.technicalUserSetup.heading')}
              </Typography>
              <Typography variant="body2" className="form-field">
                {t('content.adminboardDetail.technicalUserSetup.message')}
              </Typography>
              {getTechUserData(
                Object.values(statusData?.technicalUserProfile)[0]
              )}
            </>
          )}

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

        {cxTestRunsTitle && (
          <>
            <Divider className="verify-validate-form-divider" />
            <Typography variant="h4" sx={{ mb: 4 }}>
              {cxTestRunsTitle}
            </Typography>
            {defaultValues && (
              <div className="form-field">
                {defaultValues?.cxTestRuns?.map(
                  (item: { name: string; consentStatus: string }) => (
                    <div key={item.name}>
                      <Checkbox
                        key={item.name}
                        label={item.name}
                        checked={
                          item.consentStatus === ConsentStatusEnum.ACTIVE
                        }
                        disabled
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>

      {type !== AppOverviewTypes.APP_OVERVIEW_DETAILS && (
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
                  onCloseNotification={() => {
                    setValidatePublishNotification(false)
                  }}
                />
              </Grid>
            </Grid>
          )}
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <Button
            startIcon={<HelpOutlineIcon />}
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => window.open(helpUrl, '_blank')}
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
          {loading ? (
            <span
              style={{
                float: 'right',
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
          ) : (
            <Button
              onClick={handleSubmit(onValidatePublishSubmit)}
              variant="contained"
              disabled={!isValid}
              sx={{ float: 'right' }}
            >
              {submitButton}
            </Button>
          )}
        </Box>
      )}
    </div>
  )
}
