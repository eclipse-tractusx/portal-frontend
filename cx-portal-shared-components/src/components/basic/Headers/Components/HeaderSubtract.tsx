import { PageHeaderProps } from '../PageHeader'

export const HeaderSubtract = ({ hasSubtract }: PageHeaderProps) => {
  return (
    <>
      {hasSubtract &&
        <svg
          width="100%"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100% !important',
            backgroundSize: '100% 100%',
            bottom: 0,
            position: 'absolute',
          }}
        >
          <path
            height="60"
            d="M0 54.0298V60H1440V28C1226.07 41.6025 984.942 51.4951 729.597 56.2495C467.415 61.131 219.479 60.0511 0 54.0298Z"
            fill="#fff"
          />
        </svg>
      }
    </>
  )
}
