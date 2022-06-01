import { InviteFormContent } from 'components/pages/InviteBusinessPartner/components/InviteForm/InviteFormContent'
import { useState } from 'react'
import { info } from 'services/LogService'
import { Api as AdminRegistrationApi } from 'features/admin/registration/api'
import { InviteData } from 'features/admin/registration/types'

export default function InviteForm() {
  const [processing, setProcessing] = useState<string>('input')

  const doSubmitInvite = (data: InviteData) => {
    setProcessing('busy')

    new AdminRegistrationApi()
      .postInviteBusinessPartner(data)
      .then(() => {
        setProcessing('success')
        info(`onboarding for company ${data.organisationName} started`)
      })
      .catch((error: unknown) => {
        setProcessing('failure')
        info(`onboarding for company ${data.organisationName} failed`)
        info(JSON.stringify(error))
      })
      .finally(() => {
        setTimeout(() => {
          setProcessing('input')
        }, 5000)
      })
  }

  return <InviteFormContent onSubmit={doSubmitInvite} state={processing} />
}
