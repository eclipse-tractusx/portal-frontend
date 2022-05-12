import { InviteForm } from 'components/pages/InviteBusinessPartner/components/InviteForm'
import { useState } from 'react'
import { info } from 'services/LogService'
import { AdminRegistrationApi } from 'state/features/adminRegistration/api'
import { InviteData } from 'state/features/adminRegistration/types'
import './InviteBusinessPartner.scss'

export default function InviteBusinessPartner() {
  const [processing, setProcessing] = useState<string>('input')

  const doSubmitInvite = (data: InviteData) => {
    setProcessing('busy')

    new AdminRegistrationApi()
      .inviteBusinessPartner(data)
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

  return (
    <main>
      <InviteForm onSubmit={doSubmitInvite} state={processing} />
    </main>
  )
}
