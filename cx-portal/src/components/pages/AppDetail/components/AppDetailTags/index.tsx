import { Chip, Typography } from 'cx-portal-shared-components'
import './AppDetailTags.scss'

export default function AppDetailTags() {
  const tags = [
    'Digital Debugger',
    'Lorem Ipsum Dolores',
    'Lorem Ipsum Dolores',
    'Lorem Ipsum Dolores',
  ]
  return (
    <div className="appdetail-tags">
      <Typography>Tags:</Typography>
      {tags.map((tag, i) => (
        <Chip key={i} label={tag} withIcon={false} />
      ))}
    </div>
  )
}
