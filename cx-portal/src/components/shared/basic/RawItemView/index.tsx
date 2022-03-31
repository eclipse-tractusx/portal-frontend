import './RawItemView.scss'

export const RawItemView = ({ items }: { items: any[] }) => (
  <ul className="RawItemView">
    {items.map((value, i) => (
      <li key={i}>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </li>
    ))}
  </ul>
)
