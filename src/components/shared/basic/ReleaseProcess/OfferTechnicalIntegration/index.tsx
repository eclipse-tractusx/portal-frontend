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

import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { Grid } from '@mui/material'
import {
  ServiceTypeIdsEnum,
  type TechnicalUserProfileBody,
  type updateTechnicalUserProfile,
  useFetchServiceStatusQuery,
  useFetchServiceTechnicalUserProfilesQuery,
  useFetchServiceUserRolesQuery,
  useSaveServiceTechnicalUserProfilesMutation,
} from 'features/serviceManagement/apiSlice'
import {
  serviceIdSelector,
  serviceReleaseStepDecrement,
  serviceReleaseStepIncrement,
  setServiceRedirectStatus,
} from 'features/serviceManagement/slice'
import { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { ButtonLabelTypes } from '..'
import { setServiceStatus } from 'features/serviceManagement/actions'
import { error, success } from 'services/NotifyService'
import { TechUserTable } from '../TechnicalIntegration/TechUserTable'
import { AddTechUserForm } from '../TechnicalIntegration/AddTechUserForm'
import { type TechnicalUserProfiles } from 'features/appManagement/types'
import DeleteTechnicalUserProfileOverlay from '../TechnicalIntegration/DeleteTechnicalUserProfileOverlay'

export default function OfferTechnicalIntegration() {
  const { t } = useTranslation('servicerelease')
  const dispatch = useDispatch()
  const serviceId = useSelector(serviceIdSelector)
  const fetchServiceUserRoles = useFetchServiceUserRolesQuery().data
  const [serviceTechUserProfiles, setServiceTechUserProfiles] = useState<
    string[]
  >([])
  const { data, refetch } = useFetchServiceTechnicalUserProfilesQuery(
    serviceId ?? '',
    { refetchOnMountOrArgChange: true }
  )
  const fetchServiceStatus = useFetchServiceStatusQuery(serviceId ?? ' ', {
    refetchOnMountOrArgChange: true,
  }).data
  const [errorMessage, setErrorMessage] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [techIntegrationNotification, setTechIntegrationNotification] =
    useState(false)
  const [techIntegrationSnackbar, setTechIntegrationSnackbar] =
    useState<boolean>(false)
  const [saveServiceTechnicalUserProfiles] =
    useSaveServiceTechnicalUserProfilesMutation()
  const serviceTechnicalUserNone = 'NONE'
  const [deleteTechnicalUserProfile, setDeleteTechnicalUserProfile] =
    useState<boolean>(false)

  const userProfiles = useMemo(
    () => data?.[0]?.userRoles.map((i: { roleId: string }) => i.roleId) ?? [],
    [data]
  )

  useEffect(() => {
    // Set default value as "None" when user profiles don't have any roles
    // Initially, value is "None"
    setServiceTechUserProfiles(
      userProfiles.length > 0 ? userProfiles : [serviceTechnicalUserNone]
    )
  }, [userProfiles])

  const defaultValues = {
    technicalUserProfiles: [],
  }

  const { handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = (_submitData: unknown, buttonLabel: string) => {
    if (
      !fetchServiceStatus?.serviceTypeIds.every((item) =>
        [`${ServiceTypeIdsEnum.CONSULTANCY_SERVICE}`]?.includes(item)
      ) &&
      serviceTechUserProfiles.length === 0
    ) {
      setErrorMessage(true)
    } else if (
      (serviceTechUserProfiles.length === userProfiles.length &&
        serviceTechUserProfiles.every((item) =>
          userProfiles?.includes(item)
        )) ||
      (data?.length === 0 &&
        serviceTechUserProfiles?.[0] === serviceTechnicalUserNone)
    ) {
      buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED &&
        dispatch(serviceReleaseStepIncrement())
    }
  }

  const onBackIconClick = () => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
    dispatch(setServiceRedirectStatus(false))
    dispatch(serviceReleaseStepDecrement())
  }

  const [showAddTechUser, setShowAddTechUser] = useState<boolean>(false)
  const [addNewTechUserProfile, setAddNewTechUserProfile] =
    useState<boolean>(false)
  const [selectedTechUser, setSelectedTechUser] =
    useState<TechnicalUserProfiles | null>(null)

  const getBodyParams = (roles: string[]) => {
    const body: TechnicalUserProfileBody[] = []
    if (data) {
      data.forEach((techUserInfo) => {
        techUserInfo.userRoles.forEach((roleObj) => {
          if (
            selectedTechUser?.technicalUserProfileId ===
            techUserInfo.technicalUserProfileId
          ) {
            body.push({
              technicalUserProfileId: techUserInfo.technicalUserProfileId,
              userRoleIds: roles,
            })
          } else {
            const ids: string[] = []
            ids.push(roleObj.roleId)
            body.push({
              technicalUserProfileId: techUserInfo.technicalUserProfileId,
              userRoleIds: ids,
            })
          }
        })
      })
    }
    if (addNewTechUserProfile) {
      body.push({
        technicalUserProfileId: null,
        userRoleIds: roles,
      })
    }
    return body
  }

  const handleDelete = (row: TechnicalUserProfiles) => {
    const body: TechnicalUserProfileBody[] = []
    setLoading(true)
    if (data) {
      const finalyArray = data.filter(
        (techUserInfo) =>
          techUserInfo.technicalUserProfileId !== row.technicalUserProfileId
      )
      finalyArray.forEach((techUserInfo) => {
        const userRoleIds: string[] = techUserInfo.userRoles.map(
          (roleObj) => roleObj.roleId
        )
        body.push({
          technicalUserProfileId: techUserInfo.technicalUserProfileId,
          userRoleIds,
        })
      })
    }
    const updateData = {
      serviceId,
      body,
    }
    handleApiCall(updateData, 'delete')
  }

  const handletechUserProfiles = (roles: string[]) => {
    setShowAddTechUser(false)
    setLoading(true)
    const updateData = {
      serviceId,
      body:
        roles && roles[0] === serviceTechnicalUserNone
          ? []
          : getBodyParams(roles),
    }
    handleApiCall(updateData, 'update')
  }

  const handleApiCall = async (
    updateData: updateTechnicalUserProfile,
    action: string
  ) => {
    await saveServiceTechnicalUserProfiles(updateData)
      .unwrap()
      .then(() => {
        setErrorMessage(false)
        refetch()
        action === 'delete'
          ? success(t('technicalIntegration.userProfileDeleteSuccessMessage'))
          : success(t('serviceReleaseForm.dataSavedSuccessMessage'))
      })
      .catch((err) => {
        error(
          t(
            `technicalIntegration.${action === 'delete' ? 'technicalUserProfileDeleteError' : 'technicalUserProfileError'}`
          ),
          '',
          err
        )
      })
    action === 'delete' && setDeleteTechnicalUserProfile(false)
    setLoading(false)
    setAddNewTechUserProfile(false)
    setSelectedTechUser(null)
  }

  return (
    <>
      {deleteTechnicalUserProfile && (
        <DeleteTechnicalUserProfileOverlay
          openDialog
          handleDeleteClick={() => {
            selectedTechUser && handleDelete(selectedTechUser)
          }}
          handleOverlayClose={() => {
            setDeleteTechnicalUserProfile(false)
          }}
        />
      )}
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('technicalIntegration.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 4 }}>
          <Typography variant="body2" align="center">
            {t('technicalIntegration.headerDescription')}
          </Typography>
        </Grid>
      </Grid>

      <form className="header-description">
        {data && (
          <TechUserTable
            userProfiles={data}
            handleAddTechUser={() => {
              setAddNewTechUserProfile(true)
              setShowAddTechUser(true)
            }}
            handleEdit={(row: TechnicalUserProfiles) => {
              setAddNewTechUserProfile(false)
              setSelectedTechUser(row)
              setShowAddTechUser(true)
            }}
            handleDelete={(row: TechnicalUserProfiles) => {
              setDeleteTechnicalUserProfile(true)
              setSelectedTechUser(row)
            }}
          />
        )}
        {fetchServiceUserRoles && showAddTechUser && data && (
          <AddTechUserForm
            userProfiles={
              selectedTechUser
                ? selectedTechUser.userRoles
                : (data[0]?.userRoles ?? [])
            }
            handleClose={() => {
              setShowAddTechUser(false)
            }}
            handleConfirm={handletechUserProfiles}
            createNewTechUserProfile={addNewTechUserProfile}
          />
        )}

        {errorMessage && (
          <Typography variant="body2" className="file-error-msg">
            {t('technicalIntegration.technicalUserSetupMandatory')}
          </Typography>
        )}
      </form>
      <SnackbarNotificationWithButtons
        pageNotification={techIntegrationNotification}
        setPageNotification={setTechIntegrationNotification}
        pageSnackBarDescription={t(
          'serviceReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationsObject={{
          title: t('serviceReleaseForm.error.title'),
          description: t('serviceReleaseForm.error.message'),
        }}
        pageSnackbar={techIntegrationSnackbar}
        setPageSnackbar={setTechIntegrationSnackbar}
        onBackIconClick={onBackIconClick}
        onSave={handleSubmit((data) => {
          onSubmit(data, ButtonLabelTypes.SAVE)
        })}
        onSaveAndProceed={handleSubmit((data) => {
          onSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        })}
        isValid={serviceTechUserProfiles?.length > 0}
        loader={loading}
        helpUrl={
          '/documentation/?path=user%2F05.+Service%28s%29%2F02.+Service+Release+Process%2F04.+Technical+Integration.md'
        }
      />
    </>
  )
}
