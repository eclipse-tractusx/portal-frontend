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
import { useDispatch, useSelector } from 'react-redux'
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
  PageSnackbar,
  Typography,
} from '@catena-x/portal-shared-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  CompanyRolesResponse,
  useFetchRolesQuery,
} from 'features/companyRoles/companyRoleApiSlice'
import './CompanyRoleUpdate.scss'
import {
  cancelOverlayType,
  updateRoleErrorType,
  updateRoleSuccessType,
} from 'features/companyRoles/slice'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'

export default function CompanyRoles() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [companyRoles, setCompanyRoles] = useState<CompanyRolesResponse[]>([])
  const [preSelectedRoles, setPreSelectedRoles] = useState<
    CompanyRolesResponse[]
  >([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [showActiveDescRole, setShowActiveDescRole] = useState<string>()

  const updatedSuccess = useSelector(updateRoleSuccessType)
  const updatedError = useSelector(updateRoleErrorType)
  const cancelOverlay = useSelector(cancelOverlayType)

  const { data, refetch } = useFetchRolesQuery()
  useEffect(() => {
    if (data) {
      setCompanyRoles(_.cloneDeep(data))
      setPreSelectedRoles(
        data.filter((role: CompanyRolesResponse) => role.companyRolesActive)
      )
      const rolesArr: string[] = []
      data.map(
        (role: CompanyRolesResponse) =>
          role.companyRolesActive && rolesArr.push(role.companyRoles)
      )
      setSelectedRoles(rolesArr)
    }
    refetch()
  }, [data, refetch, updatedSuccess, updatedError, cancelOverlay])

  const handleAgreementCheck = (isChecked: boolean, roleName: string) => {
    const roles = _.cloneDeep(companyRoles)
    roles.filter(
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
              {companyRoles.map((role: CompanyRolesResponse) => {
                return (
                  <li key={role.companyRoles}>
                    <Checkbox
                      label={`${t(
                        'content.companyRolesUpdate.' + role.companyRoles
                      )}`}
                      checked={role.companyRolesActive}
                      onChange={(e) => {
                        handleAgreementCheck(
                          e.target.checked,
                          role.companyRoles
                        )
                      }}
                      className="checkbox-input"
                    />
                    <Typography
                      variant="caption3"
                      className={`roleDesc ${
                        showActiveDescRole === role.companyRoles
                          ? 'showAllDesc'
                          : ''
                      }`}
                    >
                      {role.roleDescription}
                    </Typography>
                    <Typography
                      variant="caption3"
                      className={`roleDescDetail ${
                        showActiveDescRole === role.companyRoles
                          ? 'primary'
                          : ''
                      }`}
                      onClick={() => {
                        setShowActiveDescRole(
                          showActiveDescRole === role.companyRoles
                            ? role.companyRoles
                            : ''
                        )
                      }}
                    >
                      {showActiveDescRole === role.companyRoles ? (
                        <>
                          <KeyboardArrowUpIcon />
                          {t('content.companyRolesUpdate.roleDescUpTitle')}
                        </>
                      ) : (
                        <>
                          <KeyboardArrowDownIcon />
                          {t('content.companyRolesUpdate.roleDescDownTitle')}
                        </>
                      )}
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
              onClick={() => {
                navigate('/')
              }}
            >
              {t('global.actions.cancel')}
            </Button>
            <span style={{ position: 'absolute', right: '10px' }}>
              <Button
                size="small"
                variant="contained"
                disabled={selectedRoles.length === preSelectedRoles.length}
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
      <PageSnackbar
        open={updatedSuccess || updatedError}
        autoClose
        description={
          updatedSuccess
            ? t('content.companyRolesUpdate.successDescription')
            : t('content.companyRolesUpdate.errorDescription')
        }
        severity={
          updatedSuccess ? SuccessErrorType.SUCCESS : SuccessErrorType.ERROR
        }
        showIcon
      />
    </main>
  )
}
