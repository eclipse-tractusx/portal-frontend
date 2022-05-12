import { ImageType } from './types'
import { Typography } from '../Typography'

export const ImageGallery = ({ gallery }: { gallery: ImageType[] }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '-15px',
      marginLeft: '-15px',
      boxSizing: 'border-box',
    }}
  >
    {gallery.map((image, index) => (
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingRight: '15px',
          paddingLeft: '15px',
          flex: '0 0 33.333333%',
          maxWidth: '33.333333%',
          boxSizing: 'border-box',
        }}
        key={index}
      >
        <img
          src={image.url}
          alt={image.text}
          style={{
            width: '100%',
            borderRadius: '20px',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: '#888888',
            margin: '5px 0',
            fontSize: '14px',
          }}
        >
          {image.text}
        </Typography>
      </div>
    ))}
  </div>
)
