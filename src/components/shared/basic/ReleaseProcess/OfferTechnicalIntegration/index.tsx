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

import { Typography, Checkbox } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { Grid } from '@mui/material'
import {
  type serviceUserRolesType,
  ServiceTypeIdsEnum,
  useFetchServiceStatusQuery,
  useFetchServiceTechnicalUserProfilesQuery,
  useFetchServiceUserRolesQuery,
  useSaveServiceTechnicalUserProfilesMutation,
} from 'features/serviceManagement/apiSlice'
import {
  serviceIdSelector,
  serviceReleaseStepDecrement,
  serviceReleaseStepIncrement,
} from 'features/serviceManagement/slice'
import { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { ButtonLabelTypes } from '..'
import { setServiceStatus } from 'features/serviceManagement/actions'
import { error, success } from 'services/NotifyService'

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

  const userProfiles = useMemo(
    () => data?.[0]?.userRoles.map((i: { roleId: string }) => i.roleId) ?? [],
    [data]
  )

  useEffect(() => {
    setServiceTechUserProfiles(userProfiles)
  }, [userProfiles])

  const defaultValues = {
    technicalUserProfiles: [],
  }

  const { handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const handleUserProfiles = (checked: boolean, item: serviceUserRolesType) => {
    const isSelected = serviceTechUserProfiles?.includes(item.roleId)
    if (!isSelected && checked) {
      setServiceTechUserProfiles([...serviceTechUserProfiles, item.roleId])
    } else if (isSelected && !checked) {
      const oldTechUserProfiles = [...serviceTechUserProfiles]
      oldTechUserProfiles.splice(oldTechUserProfiles.indexOf(item.roleId), 1)
      setServiceTechUserProfiles([...oldTechUserProfiles])
    }
  }

  const onSubmit = async (submitData: unknown, buttonLabel: string) => {
    if (
      !fetchServiceStatus?.serviceTypeIds.every((item) =>
        [`${ServiceTypeIdsEnum.CONSULTANCY_SERVICE}`]?.includes(item)
      ) &&
      serviceTechUserProfiles.length === 0
    ) {
      setErrorMessage(true)
    } else if (
      buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED &&
      serviceTechUserProfiles.length === userProfiles.length &&
      serviceTechUserProfiles.every((item) => userProfiles?.includes(item))
    ) {
      dispatch(serviceReleaseStepIncrement())
    } else if (
      !(
        serviceTechUserProfiles.length === userProfiles.length &&
        serviceTechUserProfiles.every((item) => userProfiles?.includes(item))
      )
    ) {
      setLoading(true)
      const updateData = {
        serviceId,
        body: [
          {
            technicalUserProfileId: data?.[0]?.technicalUserProfileId ?? null,
            userRoleIds: serviceTechUserProfiles,
          },
        ],
      }
      if (updateData)
        await saveServiceTechnicalUserProfiles(updateData)
          .unwrap()
          .then(() => {
            setErrorMessage(false)
            refetch()
            buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED
              ? dispatch(serviceReleaseStepIncrement())
              : success(t('serviceReleaseForm.dataSavedSuccessMessage'))
          })
          .catch((err) => {
            error(t('technicalIntegration.technicalUserProfileError'), '', err)
          })
      setLoading(false)
    }
  }

  const onBackIconClick = () => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
    dispatch(serviceReleaseStepDecrement())
  }

  return (
    <>
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
        {fetchServiceUserRoles?.map((item) => (
          <Grid container spacing={1.5} key={item.roleId}>
            <Grid item md={12} className="userRoles">
              <Checkbox
                label={`${item.roleName} (${
                  item.roleDescription === null ? '' : item.roleDescription
                })`}
                checked={serviceTechUserProfiles.some(
                  (role) => item.roleId === role
                )}
                onChange={(e) => {
                  handleUserProfiles(e.target.checked, item)
                }}
                size="small"
              />
            </Grid>
          </Grid>
        ))}

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
        onSave={handleSubmit((data) => onSubmit(data, ButtonLabelTypes.SAVE))}
        onSaveAndProceed={handleSubmit((data) =>
          onSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        )}
        isValid={serviceTechUserProfiles?.length > 0}
        loader={loading}
        helpUrl={
          '/documentation/?path=user%2F05.+Service%28s%29%2F02.+Service+Release+Process%2F04.+Technical+Integration.md'
        }
      />
    </>
  )
}
