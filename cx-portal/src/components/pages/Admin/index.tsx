import { ProvisionIdentityProviderForm } from 'components/shared/content/ProvisionIdentityProviderForm'
import { useState, SyntheticEvent } from 'react'
import { info } from 'services/LogService'
import UserService from 'services/UserService'
import { ProvisioningApi } from 'state/api/provisioning/provisioningAPI'
import { ProvisionIdentityProviderData } from 'types/provisioning/ProvisioningTypes'
import { Tab, TabPanel, Tabs } from 'cx-portal-shared-components'
import RegistrationRequests from 'components/pages/Admin/RegistrationRequests'
import './Admin.scss'

export default function Admin() {
  const [processing, setProcessing] = useState<string>('input')
  const [tabValue, setTabValue] = useState<number>(0)

  const doSubmit = (data: ProvisionIdentityProviderData) => {
    setProcessing('busy')

    new ProvisioningApi(UserService.getToken())
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
      <Tabs
        value={tabValue}
        onChange={(event: SyntheticEvent, newValue: number) =>
          setTabValue(newValue)
        }
        aria-label="basic tabs usage"
      >
        <Tab
          sx={{ minWidth: '50%' }}
          label="Setup Company IdP"
          iconPosition="start"
        />
        <Tab
          sx={{ minWidth: '50%' }}
          label="Registration Requests"
          iconPosition="start"
        />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <ProvisionIdentityProviderForm onSubmit={doSubmit} state={processing} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <RegistrationRequests />
      </TabPanel>
    </main>
  )
}
