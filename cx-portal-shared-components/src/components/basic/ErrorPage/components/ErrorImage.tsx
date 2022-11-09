import RobotColor from '../../../assets/errorImage/robot-color.svg'
import RobotGray from '../../../assets/errorImage/robot-sw.svg'
import { SVGImage } from '../../SVGImage'

interface ErrorImageProps {
  variant?: 'color' | 'gray'
  altText?: string
}

export const ErrorImage = ({
  variant = 'color',
  altText = 'Catena-X Error',
  ...props
}: ErrorImageProps) => (
  <SVGImage
    image={variant === 'color' ? RobotColor : RobotGray}
    altText={altText}
    {...props}
  />
)
