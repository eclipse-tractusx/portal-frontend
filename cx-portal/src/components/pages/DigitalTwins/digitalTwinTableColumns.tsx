import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// Columns definitions of Digital Twin page Data Grid
export const DigitalTwinsTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()
  const columnIds = ['name', 'type', 'prov']
  return [
    ...columnIds.map(item => {return {
      field: item,
      headerName: t(`content.digitaltwin.table.columns.${item}`),
      flex: 1,
    }}),
    {
      field: '',
      headerName: `Detail`,
      flex: 1,
      align: 'center',
      renderCell: () => (
        <IconButton
          color="secondary"
          size="small"
          style={{ alignSelf: 'center' }}
        >
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
  ]
  // return [
  //   {
  //     field: 'bpn',
  //     headerName: t('content.partnernetwork.columns.bpn'),
  //     flex: 1,
  //   },
  //   {
  //     field: '',
  //     headerName: `Detail`,
  //     flex: 1,
  //     align: 'center',
  //     renderCell: () => (
  //       <IconButton
  //         color="secondary"
  //         size="small"
  //         style={{ alignSelf: 'center' }}
  //       >
  //         <ArrowForwardIcon />
  //       </IconButton>
  //     ),
  //   },
  // ]
}
