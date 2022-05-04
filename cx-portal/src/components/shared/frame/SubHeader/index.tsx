import { Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import SubHeaderTitle from '../SubHeaderTitle'
import './SubHeader.scss'

interface ComponentProps {
  title: string
  hasBackButton: boolean
}

export default function SubHeader({ title, hasBackButton }: ComponentProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <div className="sub-header">
        <div className="sub-header-title">
          <SubHeaderTitle title={title} />
        </div>

        <svg
          width="100%"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sub-header-subtract"
        >
          <path
            height="60"
            d="M0 54.0298V60H1440V28C1226.07 41.6025 984.942 51.4951 729.597 56.2495C467.415 61.131 219.479 60.0511 0 54.0298Z"
            fill="#fff"
          />
        </svg>
      </div>

      {hasBackButton && (
        <div className="sub-header-back">
          <Button
            name="back"
            size="small"
            color="secondary"
            onClick={() => navigate(-1)}
            sx={{}}
          >
            {`${t('global.actions.back')}`}
          </Button>
        </div>
      )}
    </>
  )
}
