import { ProvisionIdentityProviderForm } from 'components/pages/Admin/components/ProvisionIdentityProviderForm'
import { useState } from 'react'
import { info } from 'services/LogService'
import { ProvisioningApi } from 'features/provisioning/api'
import { ProvisionIdentityProviderData } from 'features/provisioning/types'
import './Admin.scss'

export default function Admin() {
  const [processing, setProcessing] = useState<string>('input')

  const doSubmit = (data: ProvisionIdentityProviderData) => {
    setProcessing('busy')

    new ProvisioningApi()
      .provisionIdp(data)
      .then(() => {
        setProcessing('success')
        info(`provisioning for company ${data.organisationName} started`)
      })
      .catch((error: unknown) => {
        setProcessing('failure')
        info(`provisioning for company ${data.organisationName} failed`)
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
      <ProvisionIdentityProviderForm onSubmit={doSubmit} state={processing} />
    </main>
  )
}
