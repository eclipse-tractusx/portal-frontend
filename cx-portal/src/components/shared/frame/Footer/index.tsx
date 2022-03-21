import { Navigation } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import './Footer.scss'

export const Footer = ({ pages }: { pages: string[] }) => {
  const { t } = useTranslation()

  const items = pages.map((page) => ({
    to: page,
    title: t(`pages.${page}`),
  }))

  return (
    <div className="Footer">
      <Navigation unstyled items={items} component={NavLink} />
      <span className="copyright">Copyright © Catena-X Automotive Network</span>
    </div>
  )
}
