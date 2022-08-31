import { Box } from '@mui/material'
import { SubscriptionStatus, ImageType } from 'features/apps/apiSlice'
import { LogoGrayData } from 'cx-portal-shared-components'

export default function AppSubscriptions({
  name,
  provider,
  status,
  image,
  onButtonClick = () => {},
}: {
  name: string
  provider: string
  status: SubscriptionStatus | undefined
  image: ImageType | undefined
  onButtonClick?: React.MouseEventHandler
}) {
  const colorCode = [
    { name: SubscriptionStatus.PENDING, code: ' #969696' },
    { name: SubscriptionStatus.INACTIVE, code: 'red' },
    { name: SubscriptionStatus.ACTIVE, code: 'green' },
  ].find((e) => e.name === status)?.code

  return (
    <div
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      onClick={onButtonClick}
    >
      <Box sx={{ paddingRight: 2 }}>
        <Box
          component="img"
          src={image?.src || LogoGrayData}
          alt={image?.alt}
          sx={{
            objectFit: 'cover',
            width: 30,
            height: 30,
            borderRadius: '50%',
          }}
        />
      </Box>

      <span>
        {name} - by {provider}
      </span>
      <span style={{ color: colorCode }}> - {status}</span>
    </div>
  )
}
