import { TableType } from './types'

export const HorizontalTable = ({ data }: { data: TableType }) => (
  <table style={{ width: '100%',borderCollapse: 'collapse' }}>
    {data.head.map((col, i) => (
      <tr>
        <th style={{backgroundColor: '#ecf0f4', textAlign: 'left',padding: '10px 15px',width: '160px', borderBottom: '1px solid #e0e1e2'}}>{col}</th>
        {
          data.body[i].map((row) => (
            <td style={{borderBottom: '1px solid #e0e1e2', padding: '10px 15px'}}>{row}</td>
          ))
        }
      </tr>
    ))}
  </table>
)