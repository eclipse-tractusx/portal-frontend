import { Typography, Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './PictureWithText.scss'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

type PictureWithTextProps = {
  image?: string
  text: string
  onButtonClicked?: () => void
}

export default function PictureWithText({
  image = './edc-connector-text-image.png',
  text,
  onButtonClicked,
}: PictureWithTextProps) {
  const { t } = useTranslation()

  return (
    <div className={'picture-with-text-container'}>
      <img src={image} alt={'alt tag info'} />
      <div className={'text-with-button-wrapper'}>
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="body1">
          {t(text)}
        </Typography>

        <Button startIcon={<AddCircleOutlineIcon />} onClick={onButtonClicked}>
          {t('content.edcconnector.addconnectorbutton')}
        </Button>
      </div>
    </div>
  )
}
