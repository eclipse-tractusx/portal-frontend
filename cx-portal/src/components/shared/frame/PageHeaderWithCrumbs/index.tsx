import { Breadcrumb, PageHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'

export default function PageHeaderWithCrumbs({ crumbs }: { crumbs: string[] }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const page = crumbs[crumbs.length - 1]
  const path = crumbs.slice(0, -1)
  path.unshift('home')
  const title = t(`pages.${page}`)
  return (
    <PageHeader title={title} topPage={true} headerHeight={200}>
      <Breadcrumb
        backButtonLabel="Back"
        backButtonVariant="contained"
        breadcrumbs={path
          .map((crumb) => (
            <NavLink
              style={{
                display: 'block',
                marginBottom: '2px',
                fontSize: '14px',
              }}
              key={crumb}
              to={`/${crumb}`}
            >
              {t(`pages.${crumb}`)}
            </NavLink>
          ))
          .concat(
            <NavLink
              style={{
                display: 'block',
                marginBottom: '2px',
                fontSize: '14px',
                color: 'black',
                textDecoration: 'none',
              }}
              to="#"
            >
              {title}
            </NavLink>
          )}
        onBackButtonClick={() => navigate(-1)}
      />
    </PageHeader>
  )
}
