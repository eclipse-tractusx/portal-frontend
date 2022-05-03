import { Typography } from 'cx-portal-shared-components'
import './SubHeader.scss'

interface ComponentProps {
  title: string
}

export default function SubHeader({ title }: ComponentProps) {
  return (
    <div className="alternative-header">
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="h4"
        className="alternative-header-title"
      >
        {title}
      </Typography>

      <svg
        width="100%"
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="alternative-header-wave"
      >
        <path
          height="60"
          d="M0 54.0298V60H1440V28C1226.07 41.6025 984.942 51.4951 729.597 56.2495C467.415 61.131 219.479 60.0511 0 54.0298Z"
          fill="#fff"
        />
      </svg>
    </div>
  )
}
