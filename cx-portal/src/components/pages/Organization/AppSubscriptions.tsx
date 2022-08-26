export default function AppSubscriptions({
  name,
  provider,
  status,
  onButtonClick = () => {},
}: {
  name: string
  provider: string
  status: string
  onButtonClick?: React.MouseEventHandler
}) {
  const colorCode = [
    { name: 'In progress', code: ' #969696' },
    { name: 'Active', code: 'green' },
    { name: 'Inactive', code: 'red' },
  ].find((e) => {
    return (e.name = status)
  })?.code
  return (
    <div style={{ cursor: 'pointer' }} onClick={onButtonClick}>
      {name} - by {provider} -{' '}
      <span style={{ color: colorCode }}>{status}</span>
    </div>
  )
}
