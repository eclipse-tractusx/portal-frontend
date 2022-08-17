import { Chip, Typography } from 'cx-portal-shared-components'
import { AppDetails } from 'features/apps/apiSlice'
import './AppDetailTags.scss'

export default function AppDetailTags({ item }: { item: AppDetails }) {
  const tags = item.tags
  return (
    <div className="appdetail-tags">
      <Typography>Tags:</Typography>
      {tags.map((tag, i) => (
        <Chip key={i} label={tag} withIcon={false} type="plain" />
      ))}
    </div>
  )
}
