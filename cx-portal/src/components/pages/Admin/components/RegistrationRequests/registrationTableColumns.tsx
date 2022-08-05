import { IconButton, StatusTag, Chip } from 'cx-portal-shared-components'
import { GridColDef } from '@mui/x-data-grid'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { RegistrationRequestDataGrid } from 'features/admin/registration/types'
import dayjs from 'dayjs'
import uniqueId from 'lodash/uniqueId'

// Columns definitions of Registration Request page Data Grid
export const RegistrationRequestsTableColumns = (
  translationHook: any,
  onApproveClick: (id: string) => void,
  onDeclineClick: (id: string) => void
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'applicationId',
      headerName: t('content.admin.registration-requests.columns.request'),
      description: t(
        'content.admin.registration-requests.columns.requestDescription'
      ),
      flex: 1,
    },
    {
      field: 'dateCreated',
      headerName: t('content.admin.registration-requests.columns.date'),
      flex: 1,
      valueGetter: ({ row }: { row: RegistrationRequestDataGrid }) =>
        dayjs(row.dateCreated).format('YYYY-MM-DD'),
    },

    {
      field: 'companyInfo',
      headerName: t('content.admin.registration-requests.columns.companyinfo'),
      flex: 2,
      sortable: false,
      renderCell: ({ row }: { row: RegistrationRequestDataGrid }) => (
        <div>
          <p style={{ margin: '3px 0' }}>{row.companyInfo.companyName}</p>
          <p style={{ margin: '3px 0' }}>{row.companyInfo.email}</p>
          <span>{row.companyInfo.bpn}</span>
        </div>
      ),
    },
    {
      field: 'documents',
      headerName: t('content.admin.registration-requests.columns.documents'),
      flex: 2,
      sortable: false,
      cellClassName: 'documents-column--cell',
      renderCell: ({ row }: { row: RegistrationRequestDataGrid }) => (
        <div className="document-cell-container">
          {row.documents.map((contract) => {
            return (
              <div
                className="document-cell-line"
                key={uniqueId(contract?.documentHash)}
              >
                <ArticleOutlinedIcon />
                <a href={contract?.documentHash} rel="noreferrer">
                  {contract?.documentType}
                </a>
              </div>
            )
          })}
        </div>
      ),
    },
    {
      field: 'detail',
      headerName: t('content.admin.registration-requests.columns.details'),
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
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
    {
      field: 'status',
      headerName: t('content.admin.registration-requests.columns.state'),
      align: 'center',
      headerAlign: 'center',
      flex: 1.2,
      sortable: false,
      renderCell: ({ row }: { row: RegistrationRequestDataGrid }) => {
        if (row.status === 'SUBMITTED')
          return (
            <div className="state-cell-container">
              <Chip
                {...{
                  color: 'secondary',
                  variant: 'filled',
                  label: t('content.admin.registration-requests.buttondecline'),
                  type: 'decline',
                  onClick: () => onDeclineClick(row.applicationId),
                  withIcon: true,
                }}
              />

              <Chip
                {...{
                  color: 'secondary',
                  variant: 'filled',
                  label: t('content.admin.registration-requests.buttonconfirm'),
                  type: 'confirm',
                  onClick: () => onApproveClick(row.applicationId),
                  withIcon: true,
                }}
              />
            </div>
          )
        else
          return (
            <div className="state-cell-container">
              <StatusTag
                color={row.status === 'CONFIRMED' ? 'confirmed' : 'declined'}
                label={t(
                  `content.admin.registration-requests.cell${row.status.toLowerCase()}`
                )}
              />
            </div>
          )
      },
    },
  ]
}
