import { Dialog, DialogHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { addTechnicalUserOpenSelector } from 'features/admin/user/slice'

export const AddTechnicalUserOverlay = () => {
  const { t } = useTranslation()
  const addTechnicalUserOpen = useSelector(addTechnicalUserOpenSelector)

  return (
    <div>
      <Dialog open={addTechnicalUserOpen}>
        <DialogHeader
          title={t('content.addUser.headline')}
          intro={t('content.addUser.subheadline')}
        />
      </Dialog>
    </div>
  )
}
