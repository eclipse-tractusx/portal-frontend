import { GalleryType } from './types'

export const ImageGallery = ({ gallery }: { gallery: GalleryType }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '-15px',
      marginLeft: '-15px',
      boxSizing: 'border-box',
    }}
  >
    {gallery.images.map((image, index) => (
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingRight: '15px',
          paddingLeft: '15px',
          //-ms-flex: 0 0 33.333333%;
          flex: '0 0 33.333333%',
          maxWidth: '33.333333%',
          boxSizing: 'border-box',
        }}
        key={index}
      >
        <img
          src={image}
          alt=""
          style={{
            width: '100%',
            borderRadius: '20px',
          }}
        />
        <p
          style={{
            color: '#888888',
            margin: '5px 0',
            fontSize: '14px',
          }}
        >
          {gallery.text[index]}
        </p>
      </div>
    ))}
  </div>
)
