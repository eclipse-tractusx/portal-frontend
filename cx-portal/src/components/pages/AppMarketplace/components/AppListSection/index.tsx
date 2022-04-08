import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import { GroupItemView } from 'components/shared/basic/GroupItemView'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApps } from 'state/features/appMarketplace/appMarketplaceActions'
import { selectorAppMarketplace } from 'state/features/appMarketplace/appMarketplaceSlice'
import { selectorUser } from 'state/features/user/userSlice'

export default function AppListSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { apps } = useSelector(selectorAppMarketplace)
  const { token } = useSelector(selectorUser)
  const [group, setGroup] = useState<string>('')

  useEffect(() => {
    if (token) {
      dispatch(fetchApps(token))
    }
  }, [token, dispatch])

  const doGroup = (e: React.FormEvent<HTMLInputElement>) => {
    setGroup(e.currentTarget.value)
  }

  return (
    <section className="business-applications-section">
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="h3"
        className="section-title"
      >
        {t('content.appstore.appListSection.title')}
      </Typography>

      <div className="GroupSelect">
        <input
          type="radio"
          name="group"
          value=""
          checked={group === ''}
          onChange={doGroup}
        />
        none
        <input
          type="radio"
          name="group"
          value="useCases"
          checked={group === 'useCases'}
          onChange={doGroup}
        />
        use cases
        <input
          type="radio"
          name="group"
          value="subtitle"
          checked={group === 'subtitle'}
          onChange={doGroup}
        />
        vendor
      </div>
      <GroupItemView items={apps} groupKey={group} />
    </section>
  )
}
