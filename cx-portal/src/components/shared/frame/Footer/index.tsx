import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import './Footer.scss'

export const Footer = ({ pages }: { pages: string[] }) => {
  const { t } = useTranslation()
  return (
    <div className="Footer">
      <div>
        <nav>
          {pages.map((page, i) => (
            <NavLink key={i} to={`/${page}`}>
              {t(`pages.${page}`)}
            </NavLink>
          ))}
        </nav>
      </div>
      <span className="copyright">Copyright © Catena-X Automotive Network</span>
    </div>
  )
}
