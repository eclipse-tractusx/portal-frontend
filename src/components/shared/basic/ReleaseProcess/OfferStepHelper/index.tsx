import { ConsentStatusEnum } from 'features/serviceManagement/apiSlice'
import { type ServiceStatusDataState } from 'features/serviceManagement/types'

export function isStepCompleted(
  fetchServiceStatus: ServiceStatusDataState,
  step: number,
  redirectStatus: boolean
) {
  switch (step) {
    case 1:
      return (
        fetchServiceStatus?.title &&
        fetchServiceStatus?.serviceTypeIds?.length &&
        fetchServiceStatus?.descriptions[0]?.shortDescription &&
        fetchServiceStatus?.descriptions[1]?.shortDescription &&
        redirectStatus
      )
    case 2:
      return (
        fetchServiceStatus?.descriptions[0]?.longDescription &&
        fetchServiceStatus?.descriptions[1]?.longDescription &&
        redirectStatus
      )
    case 3:
      return (
        fetchServiceStatus?.agreements?.length &&
        fetchServiceStatus?.agreements[0]?.consentStatus ===
          ConsentStatusEnum.ACTIVE &&
        fetchServiceStatus?.documents?.CONFORMITY_APPROVAL_SERVICES?.length &&
        redirectStatus
      )
    default:
      return false
  }
}
