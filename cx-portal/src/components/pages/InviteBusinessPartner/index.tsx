import { InviteForm } from 'components/shared/content/InviteForm'
import { useState } from 'react'
import { info } from 'services/LogService'
import UserService from 'services/UserService'
import { UserAdministrationApi } from 'state/api/userAdministration/userAdministrationAPI'
import { InviteData } from 'types/userAdministration/UserAdministrationTypes'
import './InviteBusinessPartner.scss'

export default function InviteBusinessPartner() {
  const [processing, setProcessing] = useState<string>('input')

  const doSubmitInvite = (data: InviteData) => {
    setProcessing('busy')

    new UserAdministrationApi(UserService.getToken())
      .inviteBusinessPartner(data)
      .then(() => {
        setProcessing('success')
        info(`onboarding for company ${data.organizationName} started`)
      })
      .catch((error: unknown) => {
        setProcessing('failure')
        info(`onboarding for company ${data.organizationName} failed`)
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
