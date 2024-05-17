import {
  ApplicationRequestStatus,
  type ProgressStatus,
} from 'features/admin/applicationRequestApiSlice'

type ProgressItems = Record<ProgressStatus, number>

export const Progress = ({
  applicationStatus,
  items,
  totalItems,
}: {
  applicationStatus?: ApplicationRequestStatus
  items: ProgressItems
  totalItems: number
}) => {
  const green = (items.DONE / totalItems) * 360
  const yellow = (items.IN_PROGRESS / totalItems) * 360 + green
  const red = (items.FAILED / totalItems) * 360 + yellow

  const progressStepBgColor = () => {
    switch (applicationStatus) {
      case ApplicationRequestStatus.CONFIRMED:
        return '#e2f6c7'
      case ApplicationRequestStatus.DECLINED:
        return '#fee7e2'
      default:
        return '#ffffff'
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: `conic-gradient(#00aa55 ${green}deg, #efb800 ${green}deg ${yellow}deg, #d91e18 ${yellow}deg ${red}deg, #ffffff ${red}deg 360deg)`,
      }}
    >
      <div
        style={{
          background: progressStepBgColor(),
          width: '22px',
          height: '22px',
          lineHeight: '22px',
          fontSize: '9px',
          fontWeight: 'bold',
          borderRadius: '50%',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        {applicationStatus !== ApplicationRequestStatus.DECLINED &&
          `${items.DONE}/${totalItems}`}
      </div>
    </div>
  )
}
