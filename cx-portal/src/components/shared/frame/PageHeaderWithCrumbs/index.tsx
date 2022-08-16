import { Breadcrumb, PageHeader, Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function PageHeaderWithCrumbs({ crumbs }: { crumbs: string[] }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const page = crumbs[crumbs.length - 1]
  const path = crumbs.slice(0, -1)
  path.unshift('home')
  const title = t(`pages.${page}`)
  return (
    <PageHeader title={title} topPage={true} headerHeight={314}>
      <Breadcrumb
        backButtonLabel="Back"
        backButtonVariant="contained"
        breadcrumbs={path
          .map((crumb) => (
            <Typography
              key={crumb}
              sx={{
                fontSize: '14px',
                color: '#0f71cb',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  color: '#017ab0',
                },
              }}
              onClick={() => navigate(`/${crumb}`)}
            >
              {t(`pages.${crumb}`)}
            </Typography>
          ))
          .concat(
            <Typography
              key={page}
              sx={{ fontSize: '14px' }}
              color="text.primary"
            >
              {title}
            </Typography>
          )}
        onBackButtonClick={() => navigate(-1)}
      />
    </PageHeader>
  )
}
