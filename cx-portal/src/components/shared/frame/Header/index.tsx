import { UserInfo } from '../UserInfo'
import { Logo } from '../Logo'
import { NavLink, useNavigate } from 'react-router-dom'
import { Navigation, Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './Header.scss'
import { MenuItem, Tree } from 'types/MainTypes'

export const Header = ({ main, user }: { main: Tree[]; user: string[] }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const addTitle = (menu: Tree[] | undefined) =>
    menu?.map(
      (item: Tree): MenuItem => ({
        ...item,
        to: `/${item.name}`,
        title: t(`pages.${item.name}`),
        children: addTitle(item.children),
      })
    )

  const menu = addTitle(main) || []

  return (
    <header>
      <Logo />
      <Navigation items={menu} component={NavLink} />
      <div className="d-flex">
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => navigate('/help')}
          sx={{ backgroundColor: 'white', marginRight: '16px' }}
        >
          {t('pages.help')}
        </Button>
        <UserInfo pages={user} />
      </div>
    </header>
  )
}
