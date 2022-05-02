import './AppDetailTags.scss'

export default function AppDetailTags() {
  return (
    <div className="container">
      <div className="all-tags">
        <p>Tags:</p>
        <ul className="row">
          <li key="digital_debugger">
            <a href="/#">Digital Debugger</a>
          </li>
          <li key="lorem_dolores">
            <a href="/#">Lorem IPsum dolores</a>
          </li>
          <li key="digital_ipsum">
            <a href="/#">Digital Ipsum</a>
          </li>
          <li key="lorem_ipsum">
            <a href="/#">Lorem Di Ipsum</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
