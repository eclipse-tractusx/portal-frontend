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

  const progressColor = () => {
    if (ApplicationRequestStatus.CONFIRMED && items?.SKIPPED === 1) {
      return {
        progressBg: '#eaf1fe',
        progressColor: 'conic-gradient(#00aa55 360deg 360deg)',
      }
    } else
      switch (applicationStatus) {
        case ApplicationRequestStatus.CONFIRMED:
          return {
            progressBg: '#e2f6c7',
            progressColor: 'conic-gradient(#00aa55 360deg 360deg)',
          }
        case ApplicationRequestStatus.DECLINED:
        case ApplicationRequestStatus.CANCELLED_BY_CUSTOMER:
          return {
            progressBg: '#fee7e2',
            progressColor: 'conic-gradient(#d91e18 360deg 360deg)',
          }
        default:
          return {
            progressBg: '#ffffff',
            progressColor: `conic-gradient(#00aa55 ${green}deg, #efb800 ${green}deg ${yellow}deg, #d91e18 ${yellow}deg ${red}deg, #ffffff ${red}deg 360deg)`,
          }
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
        background: progressColor().progressColor,
      }}
    >
      <div
        style={{
          background: progressColor().progressBg,
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
          `${items.DONE + items.SKIPPED}/${totalItems}`}
      </div>
    </div>
  )
}
