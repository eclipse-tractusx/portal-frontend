import { PageHeaderProps } from '../PageHeader'

export const HeaderSubtractOption3 = ({ hasSubtract }: PageHeaderProps) => {
  return (
    <>
      {hasSubtract && (
        <svg
          width="100%"
          viewBox="0 0 1440 36"
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
            height="36"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 36L80.4 34.2857C159.6 34.2857 320.4 34.2857 480 28.5714C639.6 22.8571 800.4 11.4286 960 5.71429C1119.6 0 1280.4 0 1359.6 0H1440V36H1359.6C1280.4 36 1119.6 36 960 36C800.4 36 639.6 36 480 36C320.4 36 159.6 36 80.4 36H0Z"
            fill="#fff"
          />
        </svg>
      )}
    </>
  )
}
