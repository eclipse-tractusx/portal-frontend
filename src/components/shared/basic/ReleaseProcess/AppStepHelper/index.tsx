import {
  ConsentStatusEnum,
  type updateRolePayload,
} from 'features/appManagement/apiSlice'
import { type AppStatusDataState } from 'features/appManagement/types'

export function isStepCompleted(
  fetchAppStatus: AppStatusDataState,
  step: number,
  appRedirectStatus: boolean,
  data?: updateRolePayload[]
) {
  switch (step) {
    case 1:
      return (
        fetchAppStatus?.title &&
        fetchAppStatus.provider &&
        fetchAppStatus.descriptions[0]?.shortDescription &&
        fetchAppStatus.descriptions[1]?.shortDescription &&
        fetchAppStatus.useCase?.length &&
        fetchAppStatus.supportedLanguageCodes?.length &&
        fetchAppStatus.documents?.APP_LEADIMAGE?.length &&
        fetchAppStatus.price &&
        appRedirectStatus
      )
    case 2:
      return (
        fetchAppStatus?.descriptions[0]?.longDescription &&
        fetchAppStatus.descriptions[1]?.longDescription &&
        fetchAppStatus.images?.length &&
        fetchAppStatus?.privacyPolicies?.length &&
        appRedirectStatus
      )
    case 3:
      return (
        fetchAppStatus?.agreements &&
        fetchAppStatus.agreements[0]?.consentStatus ===
          ConsentStatusEnum.ACTIVE &&
        fetchAppStatus.agreements[1]?.consentStatus ===
          ConsentStatusEnum.ACTIVE &&
        fetchAppStatus.agreements[2]?.consentStatus ===
          ConsentStatusEnum.ACTIVE &&
        fetchAppStatus.documents?.CONFORMITY_APPROVAL_BUSINESS_APPS?.length &&
        appRedirectStatus
      )
    case 4:
      return data && data.length > 0 && appRedirectStatus
    case 5:
      return fetchAppStatus && appRedirectStatus
    default:
      return false
  }
}
