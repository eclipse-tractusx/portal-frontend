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
  PageHeader,
  Typography,
  CardHorizontal,
  StaticTable,
} from 'cx-portal-shared-components'
import './ServiceDetail.scss'
import { useFetchServiceStatusQuery } from 'features/serviceManagement/apiSlice'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { Divider, InputLabel } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useParams } from 'react-router-dom'

export default function ServiceDetails() {
  const { t } = useTranslation('servicerelease')
  const { serviceId } = useParams()
  const fetchServiceStatus = useFetchServiceStatusQuery(serviceId || '', {
    refetchOnMountOrArgChange: true,
  }).data

  const getServiceTypes = useCallback(() => {
    const newArr: string[] = []
    fetchServiceStatus?.serviceTypeIds.forEach((serviceType: string) => {
      if (serviceType === 'CONSULTANCE_SERVICE')
        newArr.push('Consultance Service')
      if (serviceType === 'DATASPACE_SERVICE') newArr.push('Dataspace Service')
    })
    return newArr.join(', ')
  }, [])

  return (
    <main>
      <div>
        <PageHeader title={t('headerTitle')} topPage={true} headerHeight={200}>
          <PageBreadcrumb backButtonVariant="contained" />
        </PageHeader>
      </div>
      {fetchServiceStatus && (
        <>
          <div className="servicedetail-main">
            <div className="imageCard">
              <CardHorizontal
                borderRadius={6}
                imageAlt="Service Card"
                imagePath={'ServiceMarketplace.png'}
                label={''}
                buttonText=""
                onBtnClick={() => {}}
                title={fetchServiceStatus.title}
                subTitle={getServiceTypes()}
                description={''}
                backgroundColor="#fff"
              />
            </div>
          </div>
          <div className="textContainer">
            <>
              <Typography variant="h4" sx={{ mb: 4 }}>
                {t('step4.appDetails')}
              </Typography>
              {['longDescriptionEN', 'longDescriptionDE'].map((item) => (
                <div key={item}>
                  {item === 'longDescriptionEN' ? (
                    <Typography
                      sx={{
                        marginBottom: '40px',
                      }}
                      variant="body2"
                      className="form-field"
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {t('step4.longDescriptionTitleEN')}
                      </span>
                      {
                        fetchServiceStatus?.descriptions?.filter(
                          (lang: { languageCode: string }) =>
                            lang.languageCode === 'en'
                        )[0]?.longDescription
                      }
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        marginBottom: '40px',
                      }}
                      variant="body2"
                      className="form-field"
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {t('step4.longDescriptionTitleDE')}
                      </span>
                      {
                        fetchServiceStatus?.descriptions?.filter(
                          (lang: { languageCode: string }) =>
                            lang.languageCode === 'de'
                        )[0]?.longDescription
                      }
                    </Typography>
                  )}
                </div>
              ))}
              <Divider className="verify-validate-form-divider" />
            </>
            <div className="margin-h-40">
              <Typography variant="h4" sx={{ mb: 4 }}>
                {t('step4.documents')}
              </Typography>
              <Typography variant="body2" className="form-field">
                {t('defaultValues.documentsDescription')}
              </Typography>
              {fetchServiceStatus?.documents &&
                Object.keys(fetchServiceStatus.documents).map(
                  (item: any, i) => (
                    <InputLabel sx={{ mb: 0, mt: 3 }} key={item}>
                      <a href="/" style={{ display: 'flex' }}>
                        <ArrowForwardIcon fontSize="small" />
                        {fetchServiceStatus.documents[item][i].documentName}
                      </a>
                    </InputLabel>
                  )
                )}
            </div>
            <Divider className="verify-validate-form-divider" />
            <div className="margin-h-40">
              <Typography variant="h4" sx={{ mb: 4 }}>
                {t('step4.providerInformation')}
              </Typography>
              <StaticTable
                data={{
                  head: ['Homepage', 'E-Mail'],
                  body: [
                    [fetchServiceStatus?.providerUri],
                    [fetchServiceStatus?.contactEmail],
                  ],
                }}
                horizontal={true}
              />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
