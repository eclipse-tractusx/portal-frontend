import { UserInfo } from '../UserInfo'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, MainNavigation } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { MenuItem, Tree } from 'types/MainTypes'
import { Logo } from '../Logo'
import './Header.scss'

export const Header = ({ main, user }: { main: Tree[]; user: string[] }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const addTitle = (items: Tree[] | undefined) =>
    items?.map(
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
      <MainNavigation items={menu} component={NavLink}>
        <Logo />
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
      </MainNavigation>
    </header>
  )
}
