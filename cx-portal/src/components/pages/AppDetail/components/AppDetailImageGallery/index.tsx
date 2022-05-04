import './AppDetailImageGallery.scss'

export default function AppDetailHeader() {
  return (
    <div className='appdetail-gallery'>
      <div className="container">
        <div className="row">
          <div className="img-col">
            <img
              src="https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg"
              alt=""
            />
            <p>Lorem Image Caption</p>
          </div>
          <div className="img-col">
            <img
              src="https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg"
              alt=""
            />
            <p>Lorem Image Caption</p>
          </div>
          <div className="img-col">
            <img
              src="https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg"
              alt=""
            />
            <p>Lorem Image Caption</p>
          </div>
        </div>
      </div>
    </div>
  )
}
