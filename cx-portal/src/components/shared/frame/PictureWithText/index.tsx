import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './PictureWithText.scss'

type PictureWithTextProps = {
  image?: string
  text: string
}

export default function SubHeaderTitle({
  image = './edc-connector-text-image.png',
  text,
}: PictureWithTextProps) {
  const { t } = useTranslation()

  return (
    <div className={'picture-with-text-container'}>
      <img src={image} alt={'alt tag info'} />
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="body1"
        className="image-text"
      >
        {t(text)}
      </Typography>
    </div>
  )
}
