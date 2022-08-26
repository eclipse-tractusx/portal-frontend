export default function CompanyDetails({
  head,
  data,
}: {
  head: string
  data: string
}) {
  return (
    <div>
      <strong>{head}</strong>
      {data}
    </div>
  )
}
