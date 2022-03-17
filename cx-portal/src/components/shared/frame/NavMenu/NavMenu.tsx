import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import './NavMenu.scss'

export const NavMenu = ({
  pages,
  horizontal,
}: {
  pages: string[]
  horizontal?: boolean
}) => {
  const { t } = useTranslation()
  return (
    <nav className={`NavMenu ${horizontal ? 'horizontal' : 'vertical'}`}>
      {pages.map((page, i) => (
        <NavLink key={i} to={`/${page}`}>
          {t(`pages.${page}`)}
        </NavLink>
      ))}
    </nav>
  )
}
