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
  LoadingButton,
  Typography,
} from 'cx-portal-shared-components'
import { closeOverlay } from 'features/control/overlay'
import {
  AgreementsData,
  CompanyRoleRequest,
  CompanyRolesResponse,
  RoleFeatureData,
  RolesData,
  useFetchDocumentByIdMutation,
  useFetchRolesQuery,
  useUpdateCompanyRolesMutation,
} from 'features/companyRoles/companyRoleApiSlice'
import CommonService from 'services/CommonService'
import { download } from 'utils/downloadUtils'
import './style.scss'
import {
  setCompanyRoleError,
  setCompanyRoleSuccess,
} from 'features/companyRoles/slice'

enum AgreementStatus {
  ACTIVE = 'ACTIVE',
}

export default function UpdateCompanyRole({ roles }: { roles: string[] }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const close = () => dispatch(closeOverlay())

  const [loading, setLoading] = useState(false)
  const [agreements, setAgreements] = useState<AgreementsData[]>([])
  const [checkedAgreementsIds, setCheckedAgreementsIds] = useState<string[]>([])

  const [getDocumentById] = useFetchDocumentByIdMutation()
  const { data } = useFetchRolesQuery()
  const [updateCompanyRoles] = useUpdateCompanyRolesMutation()

  const newSelectedRoles = data
    ? data.filter(
        (role) =>
          roles.indexOf(role.companyRoles) !== -1 && !role.companyRolesActive
      )
    : []
  const newDeselectedRoles = data
    ? data.filter((role) => roles.indexOf(role.companyRoles) === -1)
    : []

  const newRolesSummary = [...newSelectedRoles, ...newDeselectedRoles]

  useEffect(() => {
    data?.map(
      (role: CompanyRolesResponse) =>
        roles.indexOf(role.companyRoles) !== -1 &&
        role.agreements.map((agreement: AgreementsData) =>
          setAgreements((oldArray: AgreementsData[]) => [
            ...oldArray,
            agreement,
          ])
        )
    )
  }, [data, roles])

  const [dataArray, setDataArray] = useState<RolesData>()

  useEffect(() => {
    CommonService.getCompanyRoleUpdateData((data: RolesData) => {
      setDataArray(data)
    })
    dispatch(setCompanyRoleSuccess(false))
    dispatch(setCompanyRoleError(false))
  }, [dispatch])

  const getRolesFeaturesList = (data: RoleFeatureData) => {
    return (
      <div className="role-list" key={uniqueId(data.title)}>
        <Typography variant="h5" className="role-title">
          {data.title}
        </Typography>
        <Expand
          label={t('content.companyRolesUpdate.overlay.expandLabel')}
          expandedLabel={t('content.companyRolesUpdate.overlay.expandedLabel')}
          text={data.description}
        />
      </div>
    )
  }

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById(documentId).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      return download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const handleCheckedAgreement = (
    checked: boolean,
    agreement: AgreementsData
  ) => {
    if (checked) {
      checkedAgreementsIds.indexOf(agreement.agreementId) <= 0 &&
        setCheckedAgreementsIds([
          ...checkedAgreementsIds,
          agreement.agreementId,
        ])
    } else {
      const index =
        checkedAgreementsIds &&
        checkedAgreementsIds.indexOf(agreement.agreementId)
      if (index > -1) {
        checkedAgreementsIds.splice(index, 1)
        setCheckedAgreementsIds([...checkedAgreementsIds])
      }
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    const fetchAgreements = (agreements: AgreementsData[]) => {
      return agreements.map((agreement: AgreementsData) => {
        return {
          agreementId: agreement.agreementId,
          consentStatus: AgreementStatus.ACTIVE,
        }
      })
    }
    const filterRoles: CompanyRoleRequest[] = []

    data?.map((role: CompanyRolesResponse) => {
      return (
        roles.indexOf(role.companyRoles) !== -1 &&
        filterRoles.push({
          companyRoles: role.companyRoles,
          agreements: fetchAgreements(role.agreements),
        })
      )
    })
    try {
      await updateCompanyRoles(filterRoles).unwrap()
      dispatch(setCompanyRoleSuccess(true))
      close()
    } catch (error) {
      console.log(error)
      dispatch(setCompanyRoleError(true))
      close()
    }
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
              {newRolesSummary?.map((role: CompanyRolesResponse) => {
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
          {newSelectedRoles && newSelectedRoles.length > 0 && (
            <div className="mb-30">
              <Typography variant="h3" className="rolesAddedHeading">
                {t('content.companyRolesUpdate.overlay.rolesAddedHeading')}
              </Typography>
              {data?.map((role: CompanyRolesResponse) => {
                return (
                  roles.indexOf(role.companyRoles) !== -1 &&
                  dataArray &&
                  dataArray[
                    role.companyRoles as keyof RolesData
                  ]?.selected.roles.map((sampleRole: RoleFeatureData) => {
                    return getRolesFeaturesList(sampleRole)
                  })
                )
              })}
            </div>
          )}

          {/* Fetch Roles Data of Removed Roles */}
          {newDeselectedRoles && newDeselectedRoles.length > 0 && (
            <div className="mb-30">
              <Typography variant="h3" className="rolesAddedHeading">
                {t('content.companyRolesUpdate.overlay.rolesNoLongerHeading')}
              </Typography>
              {data?.map((role: CompanyRolesResponse) => {
                return (
                  roles.indexOf(role.companyRoles) === -1 &&
                  dataArray &&
                  dataArray[
                    role.companyRoles as keyof RolesData
                  ]?.deselected.roles.map((sampleRole: RoleFeatureData) => {
                    return getRolesFeaturesList(sampleRole)
                  })
                )
              })}
            </div>
          )}

          {/* Fetch Features Data of Added Features */}
          {newSelectedRoles && newSelectedRoles.length > 0 && (
            <div className="mb-30">
              <Typography variant="h3" className="rolesAddedHeading">
                {t('content.companyRolesUpdate.overlay.featuresAddedHeading')}
              </Typography>
              {data?.map((role: CompanyRolesResponse) => {
                return (
                  roles.indexOf(role.companyRoles) !== -1 &&
                  dataArray &&
                  dataArray[
                    role.companyRoles as keyof RolesData
                  ]?.selected.features.map((sampleRole: RoleFeatureData) => {
                    return getRolesFeaturesList(sampleRole)
                  })
                )
              })}
            </div>
          )}

          {/* Fetch Features Data of Removed Features */}
          {newDeselectedRoles && newDeselectedRoles.length > 0 && (
            <div className="mb-80">
              <Typography variant="h3" className="rolesAddedHeading">
                {t(
                  'content.companyRolesUpdate.overlay.featuresNoLongerHeading'
                )}
              </Typography>
              {data?.map((role: CompanyRolesResponse) => {
                return (
                  roles.indexOf(role.companyRoles) === -1 &&
                  dataArray &&
                  dataArray[
                    role.companyRoles as keyof RolesData
                  ]?.selected.features.map((sampleRole: RoleFeatureData) => {
                    return getRolesFeaturesList(sampleRole)
                  })
                )
              })}
            </div>
          )}

          <div>
            <Typography variant="h4" className="rolesAddedHeading">
              {t('content.companyRolesUpdate.overlay.termsHeading')}
            </Typography>
            <ul className="agreement-check-list">
              {agreements?.map((agreement: AgreementsData) => {
                return (
                  <li key={agreement.agreementId} className="agreement-li">
                    <Checkbox
                      onChange={(e) =>
                        handleCheckedAgreement(e.target.checked, agreement)
                      }
                    />
                    {agreement.documentId ? (
                      <>
                        <Typography variant="label2">
                          {t(
                            'content.companyRolesUpdate.overlay.TermsAndCondSpan1'
                          )}{' '}
                        </Typography>
                        <Typography
                          variant="label2"
                          className={
                            agreement.documentId ? 'agreement-span' : ''
                          }
                          onClick={() =>
                            handleDownloadClick(
                              agreement.documentId,
                              agreement.agreementName
                            )
                          }
                        >
                          {agreement.agreementName}
                        </Typography>{' '}
                        <Typography variant="label2">
                          {t(
                            'content.companyRolesUpdate.overlay.TermsAndCondSpan2'
                          )}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="label2">
                        {agreement.agreementName}
                      </Typography>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={close}>
          {`${t('global.actions.cancel')}`}
        </Button>
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator="Loading ..."
            loading
            size="medium"
            onButtonClick={() => {}}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            disabled={
              checkedAgreementsIds.length === agreements?.length ? false : true
            }
          >
            {`${t('content.companyRolesUpdate.overlay.submit')}`}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
