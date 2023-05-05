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

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { uniqueId } from 'lodash'
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Expand,
  Typography,
} from 'cx-portal-shared-components'
import { closeOverlay } from 'features/control/overlay'
import {
  CompanyRolesResponse,
  RoleData,
  SampleData,
  useFetchRolesQuery,
} from 'features/companyRoles/companyRoleApiSlice'
import CommonService from 'services/CommonService'
import './style.scss'

export default function UpdateCompanyRole({ roles }: { roles: string[] }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const close = () => dispatch(closeOverlay())

  const { data } = useFetchRolesQuery()

  const [dataArray, setDataArray] = useState<SampleData>()

  useEffect(() => {
    CommonService.getCompanyRoleUpdateData((data: SampleData) => {
      setDataArray(data)
    })
  }, [])

  const getRolesList = (sampleRole: RoleData) => {
    return (
      <div className="role-list" key={uniqueId(sampleRole.title)}>
        <Typography variant="h5" className="role-title">
          {sampleRole.title}
        </Typography>
        <Expand
          label={t('content.companyRolesUpdate.overlay.expandLabel')}
          expandedLabel={t('content.companyRolesUpdate.overlay.expandedLabel')}
          text={sampleRole.description}
        />
      </div>
    )
  }

  return (
    <Dialog open={true}>
      <DialogHeader
        {...{
          title: t('content.companyRolesUpdate.overlay.title'),
          intro: t('content.companyRolesUpdate.overlay.description'),
          closeWithIcon: true,
          onCloseWithIcon: close,
        }}
      />

      <DialogContent>
        <div className="role-overlay">
          <Typography variant="label1">
            {t('content.companyRolesUpdate.overlay.selectedRolesTitle')}
          </Typography>
          <table>
            <tbody>
              {data?.map((role: CompanyRolesResponse) => {
                return (
                  <tr key={role.companyRoles}>
                    <td className="first-td">
                      {t('content.companyRolesUpdate.overlay.role')}
                    </td>
                    <td className="second-td">{`${t(
                      'content.companyRolesUpdate.' + role.companyRoles
                    )}`}</td>
                    <td>
                      <Chip
                        color={
                          roles.indexOf(role.companyRoles) !== -1
                            ? 'warning'
                            : 'error'
                        }
                        label={
                          roles.indexOf(role.companyRoles) !== -1
                            ? t('content.companyRolesUpdate.overlay.added')
                            : t('content.companyRolesUpdate.overlay.deselected')
                        }
                        type="plain"
                        variant="filled"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Typography variant="label1" className="changeRolesHeading">
            {t('content.companyRolesUpdate.overlay.changeRolesHeading')}
          </Typography>

          {/* Fetch Roles Data of Added Roles */}
          <div className="mb-30">
            <Typography variant="h3" className="rolesAddedHeading">
              {t('content.companyRolesUpdate.overlay.rolesAddedHeading')}
            </Typography>
            {data?.map((role: CompanyRolesResponse) => {
              return (
                roles.indexOf(role.companyRoles) !== -1 &&
                dataArray &&
                dataArray[
                  role.companyRoles as keyof SampleData
                ]?.selected.roles.map((sampleRole: RoleData) => {
                  return getRolesList(sampleRole)
                })
              )
            })}
          </div>

          {/* Fetch Roles Data of Removed Roles */}
          <div className="mb-30">
            <Typography variant="h3" className="rolesAddedHeading">
              {t('content.companyRolesUpdate.overlay.rolesNoLongerHeading')}
            </Typography>
            {data?.map((role: CompanyRolesResponse) => {
              return (
                roles.indexOf(role.companyRoles) === -1 &&
                dataArray &&
                dataArray[
                  role.companyRoles as keyof SampleData
                ]?.deselected.roles.map((sampleRole: RoleData) => {
                  return getRolesList(sampleRole)
                })
              )
            })}
          </div>

          {/* Fetch Features of Added Roles */}
          <div className="mb-30">
            <Typography variant="h3" className="rolesAddedHeading">
              {t('content.companyRolesUpdate.overlay.featuresAddedHeading')}
            </Typography>
            {data?.map((role: CompanyRolesResponse) => {
              return (
                roles.indexOf(role.companyRoles) !== -1 &&
                dataArray &&
                dataArray[
                  role.companyRoles as keyof SampleData
                ]?.selected.features.map((sampleRole: RoleData) => {
                  return getRolesList(sampleRole)
                })
              )
            })}
          </div>

          {/* Fetch Features of Removed Roles */}
          <div className="mb-80">
            <Typography variant="h3" className="rolesAddedHeading">
              {t('content.companyRolesUpdate.overlay.featuresNoLongerHeading')}
            </Typography>
            {data?.map((role: CompanyRolesResponse) => {
              return (
                roles.indexOf(role.companyRoles) === -1 &&
                dataArray &&
                dataArray[
                  role.companyRoles as keyof SampleData
                ]?.selected.features.map((sampleRole: RoleData) => {
                  return getRolesList(sampleRole)
                })
              )
            })}
          </div>

          <div className="pl-40">
            <Typography variant="h4" className="rolesAddedHeading">
              {t('content.companyRolesUpdate.overlay.termsHeading')}
            </Typography>
            <Checkbox
              label={`${t('content.companyRolesUpdate.overlay.termsLabel')}`}
            />
            <Checkbox
              label={`${t('content.companyRolesUpdate.overlay.termsLabel')}`}
            />
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={close}>
          {`${t('global.actions.cancel')}`}
        </Button>
        <Button variant="contained" onClick={close}>
          {`${t('content.companyRolesUpdate.overlay.submit')}`}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
