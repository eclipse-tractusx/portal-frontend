import { GridColDef } from '@mui/x-data-grid'

// Columns definitions of Partner Network page Data Grid
export const PartnerNetworksTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'bpn',
      headerName: t('content.partnernetwork.columns.bpn'),
      flex: 2,
    },
    {
      field: 'name',
      headerName: t('content.partnernetwork.columns.name'),
      flex: 4,
    },
    {
      field: 'country',
      headerName: t('content.partnernetwork.columns.country'),
      flex: 1,
    },
    {
      field: 'street',
      headerName: t('content.partnernetwork.columns.street'),
      flex: 2,
    },
    {
      field: 'zipCode',
      headerName: t('content.partnernetwork.columns.zipcode'),
      flex: 1,
    },
    {
      field: 'city',
      headerName: t('content.partnernetwork.columns.city'),
      flex: 1,
    },
    {
      field: 'taxId',
      headerName: t('content.partnernetwork.columns.taxid'),
      flex: 1,
    },
  ]
}
