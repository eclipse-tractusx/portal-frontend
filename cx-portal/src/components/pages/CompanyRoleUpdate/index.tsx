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

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Box } from '@mui/material'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import {
  Button,
  Checkbox,
  PageHeader,
  Typography,
} from 'cx-portal-shared-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  CompanyRolesResponse,
  useFetchRolesQuery,
} from 'features/companyRoles/companyRoleApiSlice'
import './CompanyRoleUpdate.scss'

export default function CompanyRoles() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [companyRoles, setCompanyRoles] = useState<CompanyRolesResponse[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const { data } = useFetchRolesQuery()
  useEffect(() => {
    data && setCompanyRoles(_.cloneDeep(data))
  }, [data])

  const handleAgreementCheck = (isChecked: boolean, roleName: string) => {
    const roles = _.cloneDeep(companyRoles)
    roles.map(
      (role: CompanyRolesResponse) =>
        role.companyRoles === roleName && (role.companyRolesActive = isChecked)
    )
    setCompanyRoles(roles)

    //to get selected roles
    const rolesArr: string[] = []
    roles.map(
      (role) => role.companyRolesActive && rolesArr.push(role.companyRoles)
    )
    setSelectedRoles(rolesArr)
  }

  return (
    <main className="companyRoleUpdate">
      <PageHeader
        title={t('content.companyRolesUpdate.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <div className="companyRoles-main">
        <div className="container">
          <Typography variant="h2" className="heading">
            {t('content.companyRolesUpdate.heading')}
          </Typography>
          <Typography variant="body1" className="description">
            {t('content.companyRolesUpdate.description')}
          </Typography>
          <div>
            <div className="step1">
              <Typography variant="label4" className="number">
                1
              </Typography>
              <Typography variant="label2" className="detail">
                {t('content.companyRolesUpdate.step1')}
              </Typography>
            </div>
          </div>
          <div>
            <div className="step1">
              <Typography variant="label4" className="number">
                2
              </Typography>
              <Typography variant="label2" className="detail">
                {t('content.companyRolesUpdate.step2')}
              </Typography>
            </div>
          </div>
          <div>
            <div className="step1">
              <Typography variant="label4" className="number">
                3
              </Typography>
              <Typography variant="label2" className="detail">
                {t('content.companyRolesUpdate.step3')}
              </Typography>
            </div>
          </div>
          <div className="notes">
            <Typography variant="label2">
              {t('content.companyRolesUpdate.note')}
            </Typography>
            <Typography variant="caption2">
              {t('content.companyRolesUpdate.noteDetail')}
            </Typography>
          </div>
          <div className="role-agreements">
            <ul>
              {companyRoles.map((role: CompanyRolesResponse, index: number) => {
                return (
                  <li key={role.companyRoles}>
                    <Checkbox
                      label={`${t(
                        'content.companyRolesUpdate.' + role.companyRoles
                      )}`}
                      checked={role.companyRolesActive}
                      onChange={(e) =>
                        handleAgreementCheck(
                          e.target.checked,
                          role.companyRoles
                        )
                      }
                      className="checkbox-input"
                    />
                    <Typography variant="caption3" className="roleDesc">
                      {t('content.companyRolesUpdate.roleDesc' + (index + 1))}
                    </Typography>
                    <Typography variant="caption3" className="roleDescDetail">
                      <KeyboardArrowDownIcon />
                      {t('content.companyRolesUpdate.roleDescTitle')}
                    </Typography>
                  </li>
                )
              })}
            </ul>
          </div>
          <hr className="seperation" />
          <Box sx={{ position: 'relative', marginTop: '30px' }}>
            <Button
              color="secondary"
              size="small"
              onClick={() => navigate('/')}
            >
              {t('global.actions.cancel')}
            </Button>
            <span style={{ position: 'absolute', right: '10px' }}>
              <Button
                size="small"
                variant="contained"
                disabled={selectedRoles && selectedRoles.length === 0}
                onClick={() =>
                  dispatch(
                    show(
                      OVERLAYS.UPDATE_COMPANY_ROLE,
                      '',
                      '',
                      false,
                      '',
                      selectedRoles
                    )
                  )
                }
              >
                {t('global.actions.submit')}
              </Button>
            </span>
          </Box>
        </div>
      </div>
    </main>
  )
}
