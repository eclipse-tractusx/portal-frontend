import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Grid, Container } from '@mui/material'

// Columns definitions of Connector page Data Grid
export const ConnectorTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'name',
      headerName: t('content.edcconnector.columns.name'),
      flex: 2.5,
      sortable: false,
    },
    {
      field: 'id',
      headerName: t('content.edcconnector.columns.id'),
      flex: 2,
      sortable: false,
    },
    {
      field: 'type',
      headerName: t('content.edcconnector.columns.type'),
      flex: 1,
      sortable: false,
    },
    {
      field: 'detail',
      headerName: t('content.edcconnector.columns.details'),
      headerAlign: 'center',
      flex: 0.8,
      align: 'center',
      sortable: false,
      renderCell: () => (
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <IconButton
                color="secondary"
                disabled
                size="small"
                style={{ alignSelf: 'center' }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton
                color="secondary"
                disabled
                size="small"
                style={{ alignSelf: 'center' }}
              >
                <AccessTimeIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      ),
    },
  ]
}
