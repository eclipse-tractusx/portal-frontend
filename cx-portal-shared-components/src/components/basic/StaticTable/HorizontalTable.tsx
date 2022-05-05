import { TableType } from './types'

export const HorizontalTable = ({ data }: { data: TableType }) => (
  <table
    style={{
      width: '100%',
      borderCollapse: 'collapse',
      borderTop: '1px solid #e0e1e2',
    }}
  >
    <tbody>
      {data.head.map((col, c) => (
        <tr key={col}>
          <th
            style={{
              backgroundColor: '#ecf0f4',
              textAlign: 'left',
              padding: '10px 15px',
              width: '160px',
              borderBottom: '1px solid #e0e1e2',
            }}
          >
            {col}
          </th>
          {data.body[c].map((row, r) => (
            <td
              style={{
                borderBottom: '1px solid #e0e1e2',
                padding: '10px 15px',
              }}
            >
              {row}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
