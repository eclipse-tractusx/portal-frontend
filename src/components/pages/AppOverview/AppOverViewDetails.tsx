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
  Card,
  LanguageSwitch,
  Typography,
  LogoGrayData,
} from '@arena2036/portal-shared-components-construct-x'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  ConsentStatusEnum,
  useFetchAppRolesDataQuery,
  useFetchTechnicalUserProfilesQuery,
  useSubmitappMutation,
} from 'features/appManagement/apiSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AppOverviewTypes,
  type AppStatusDataState,
} from 'features/appManagement/types'
import CommonValidateAndPublish from 'components/shared/basic/ReleaseProcess/components/CommonValidateAndPublish'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'

export default function AppOverViewDetails({
  item,
  id,
}: {
  item: AppStatusDataState
  id: string
}) {
  const { t } = useTranslation()
  const [cardImage, setCardImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const [cardLanguage, setCardLanguage] = useState<string>('en')
  const { data } = useFetchAppRolesDataQuery(id ?? '')
  const [submitapp] = useSubmitappMutation()
  const { data: technicalUserProfiles } = useFetchTechnicalUserProfilesQuery(
    id ?? ''
  )

  const defaultValues = useMemo(() => {
    return {
      images: [LogoGrayData, LogoGrayData, LogoGrayData],
      conformityDocumentsDescription: t(
        'content.apprelease.defaultValues.conformityDocumentsDescription'
      ),
      documentsDescription: t(
        'content.apprelease.defaultValues.documentsDescription'
      ),
      providerTableData: {
        head: ['App Provider', 'Homepage', 'E-Mail', 'Phone'],
        body: [
          [item?.providerName],
          [item?.providerUri],
          [item?.contactEmail],
          [item?.contactNumber],
        ],
      },
      cxTestRuns: [
        {
          agreementId: 'uuid',
          consentStatus: ConsentStatusEnum.ACTIVE,
          name: 'Test run A - done',
        },
        {
          agreementId: 'uuid',
          consentStatus: ConsentStatusEnum.ACTIVE,
          name: 'Test run B - done',
        },
      ],
    }
  }, [item, t])

  const getDescription = (item: AppStatusDataState) =>
    item?.descriptions?.filter(
      (lang: { languageCode: string }) => lang.languageCode === cardLanguage
    )[0]?.shortDescription

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

  useEffect(() => {
    if (item?.documents?.APP_LEADIMAGE?.[0].documentId) {
      fetchImage(item?.documents?.APP_LEADIMAGE[0].documentId)
    }
  }, [item, fetchImage])

  return (
    <>
      {item && (
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item>
            <Card
              image={{
                src: cardImage || LogoGrayData, // To-Do : Update this with actual data when new api is available
              }}
              title={item.title}
              subtitle={item.provider}
              description={getDescription(item)}
              imageSize="normal"
              imageShape="square"
              variant="text-details"
              expandOnHover={false}
              filledBackground={true}
              buttonText={''}
            />
          </Grid>
          <Grid
            sx={{
              marginLeft: '5%',
              marginTop: '5%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5">
                {t('content.appOverview.details.language')}
              </Typography>
              <LanguageSwitch
                current={cardLanguage}
                languages={[{ key: 'de' }, { key: 'en' }]}
                onChange={(lang) => {
                  setCardLanguage(lang)
                }}
              />
            </div>
            {item?.useCase?.map((newCase) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5">
                    {t('content.appOverview.details.useCase')}
                  </Typography>
                  <Typography
                    sx={{
                      padding: '0px 10px',
                    }}
                    variant="body2"
                  >
                    {newCase.label}
                  </Typography>
                </div>
              )
            })}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5">
                {t('content.appOverview.details.price')}
              </Typography>
              <Typography
                sx={{
                  padding: '0px 10px',
                }}
                variant="body2"
              >
                {item.price}
              </Typography>
            </div>
          </Grid>
        </Grid>
      )}
      <div className="text-left">
        <CommonValidateAndPublish
          type={AppOverviewTypes.APP_OVERVIEW_DETAILS}
          stepperHeader={''}
          stepperDescription={''}
          statusData={item}
          id={id}
          techUserProfiles={technicalUserProfiles ?? []}
          fetchDocumentById={fetchDocumentById}
          submitData={submitapp}
          validateAndPublishItemText="content.apprelease.validateAndPublish"
          detailsText={t('content.apprelease.validateAndPublish.appDetails')}
          longDescriptionTitleEN={t(
            'content.apprelease.validateAndPublish.longDescriptionTitleEN'
          )}
          longDescriptionTitleDE={t(
            'content.apprelease.validateAndPublish.longDescriptionTitleDE'
          )}
          conformityDocument={t(
            'content.apprelease.validateAndPublish.conformityDocument'
          )}
          documentsTitle={t('content.apprelease.validateAndPublish.documents')}
          providerInformation={t(
            'content.apprelease.validateAndPublish.providerInformation'
          )}
          consentTitle={t('content.apprelease.validateAndPublish.consent')}
          cxTestRunsTitle={t(
            'content.apprelease.validateAndPublish.cxTestRuns'
          )}
          error={{
            title: t('content.apprelease.appReleaseForm.error.title'),
            message: t('content.apprelease.appReleaseForm.error.message'),
          }}
          helpText={''}
          submitButton={''}
          values={defaultValues}
          rolesData={data}
        />
      </div>
    </>
  )
}
