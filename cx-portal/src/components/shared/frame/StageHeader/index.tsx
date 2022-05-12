import SubHeaderTitle from '../SubHeaderTitle'

export default function StageHeader({ title }: { title: string }) {
  return (
    <div className="header-section">
      <div className="header-content">
        <SubHeaderTitle title={title} variant="h4" />
      </div>
      <img src="./stage-header-background.png" alt="Header Background" />
    </div>
  )
}
