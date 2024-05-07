enum ProgressType {
  NONE = 'NONE',
  PROGRESS = 'PROGRESS',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

type ProgressItems = Record<ProgressType, number>

export const Test = ({ items }: { items: ProgressItems }) => {
  const total = Object.values(items).reduce((a, c) => a + c)
  const red = (items.FAIL / total) * 360
  const green = (items.SUCCESS / total) * 360 + red
  const yellow = (items.PROGRESS / total) * 360 + green

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
        {items.SUCCESS}/{total}
      </div>
    </div>
  )
}
