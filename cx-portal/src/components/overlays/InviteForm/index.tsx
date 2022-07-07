import { InviteFormContent } from 'components/overlays/InviteForm/InviteFormContent'
import { useState } from 'react'
import { info } from 'services/LogService'
import { Api as AdminRegistrationApi } from 'features/admin/registration/api'
import { InviteData } from 'features/admin/registration/types'
import { DialogHeader, DialogContent, DialogActions, Button } from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { t } from 'i18next'
import { useDispatch } from 'react-redux'

export default function InviteForm() {
  const [processing, setProcessing] = useState<string>('input')
  const dispatch = useDispatch()

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

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.invite.title'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(Overlay.NONE, '')),
        }}
      />

      <DialogContent>
        <InviteFormContent onSubmit={doSubmitInvite} state={processing} />
      </DialogContent>
    </>
  )
}
