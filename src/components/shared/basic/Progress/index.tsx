import { type ProgressStatus } from 'features/admin/applicationRequestApiSlice'

type ProgressItems = Record<ProgressStatus, number>

export const Progress = ({
  items,
  totalItems,
}: {
  items: ProgressItems
  totalItems: number
}) => {
  //const total = Object.values(items).reduce((a, c) => a + c)
  const red = (items.FAILED / totalItems) * 360
  const green = (items.DONE / totalItems) * 360 + red
  const yellow = (items.IN_PROGRESS / totalItems) * 360 + green

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: `conic-gradient(red ${red}deg, green ${red}deg ${green}deg, yellow ${green}deg ${yellow}deg, white ${yellow}deg 360deg)`,
      }}
    >
      <div
        style={{
          background: 'white',
          width: '30px',
          height: '30px',
          lineHeight: '30px',
          fontSize: '9px',
          fontWeight: 'bold',
          borderRadius: '50%',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        {items.DONE}/{totalItems}
      </div>
    </div>
  )
}
