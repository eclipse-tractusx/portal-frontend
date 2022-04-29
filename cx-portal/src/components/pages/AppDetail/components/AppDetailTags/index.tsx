import { useTranslation } from 'react-i18next'
import './AppDetailTags.scss'

export default function AppDetailTags() {
  const { t } = useTranslation()

  return (
    <div className="container">
      <div className="all-tags">
        <p>Tags:</p>
        <ul className="row">
          <li>
            <a href="">Digital Debugger</a>
          </li>
          <li>
            <a href="">Lorem IPsum dolores</a>
          </li>
          <li>
            <a href="">Digital Ipsum</a>
          </li>
          <li>
            <a href="">Lorem Di Ipsum</a>
          </li>
          <li>
            <a href="">Digital Debugger</a>
          </li>
          <li>
            <a href="">Lorem IPsum dolores</a>
          </li>
          <li>
            <a href="">Digital Ipsum</a>
          </li>
          <li>
            <a href="">Lorem Di Ipsum</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
