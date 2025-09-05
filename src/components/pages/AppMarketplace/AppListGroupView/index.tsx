import '../styles.scss'
import { multiMapBy } from 'utils/dataUtils'
import { AppListGroup } from '../AppListGroup'
import { AppGroup, type AppMarketplaceCard } from 'features/apps/types'
import { AppCardWithImage } from 'components/AppCardImage'
import { CfxGrid } from '@cofinity-x/shared-components'
import { useNavigate } from 'react-router-dom'
import { getApiBase } from 'services/EnvironmentService'

export const AppListGroupView = ({
  items,
  groupKey,
}: {
  items: Array<AppMarketplaceCard>
  groupKey: string
}) => {
  const navigate = useNavigate()

  if (!groupKey || groupKey === AppGroup.ALL) {
    return (
      <CfxGrid data-testid="all-apps-container" container spacing={3}>
        {items.map((item) => (
          <CfxGrid key={item.id} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
            <AppCardWithImage
              item={{
                ...item,
                leadPictureId: `${getApiBase()}/api/apps/${item.id}/appDocuments/${item.leadPictureId}`,
              }}
              onClick={() => {
                navigate(`/appdetail/${item.id}`)
              }}
            />
          </CfxGrid>
        ))}
      </CfxGrid>
    )
  }

  const group = multiMapBy(
    items,
    (item) =>
      (item as unknown as Record<string, string | string[] | undefined>)[
        groupKey
      ]
  )

  return (
    <ul className="AppListGroupView">
      {Object.entries(group).map((v) => (
        <li key={v[0]}>
          <AppListGroup category={v[0]} items={v[1]} />
        </li>
      ))}
    </ul>
  )
}
