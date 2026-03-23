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

import { useTranslation } from 'react-i18next'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import {
  Button,
  Typography,
  ContentCard,
} from '@arena2036/portal-shared-components-construct-x'
import { useFetchCertificatesQuery } from 'features/companyCertification/companyCertificateApiSlice'
import './style.scss'
import { FilterType, SortType } from '../CompanyCertificates'
import MyCompanyInfoComponent from './MyCompanyInfoComponent'

export default function Organization() {
  const { t } = useTranslation()

  const certificates = useFetchCertificatesQuery({
    filter: FilterType.ACTIVE,
    sortOption: SortType.CertificateTypeAsc,
    page: 0,
  }).data?.content

  return (
    <main className="organization-main">
      <div className="organization-section">
        <MyCompanyInfoComponent />
        <div className="delete-btn">
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            startIcon={<CancelOutlinedIcon />}
            disabled
          >
            {t('content.organization.deleteAccount')}
          </Button>
        </div>
        <div className="certificates-section">
          <Typography variant="h4">
            {t('content.organization.certificates')}
          </Typography>
          <div className="certificate-items">
            {certificates?.map((certificate) => (
              <div key={certificate.companyCertificateType}>
                {
                  <ContentCard
                    title={certificate.companyCertificateType}
                    chipText={certificate.companyCertificateType}
                    heading="Business Partner Level: "
                    detail="N/A"
                  />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
