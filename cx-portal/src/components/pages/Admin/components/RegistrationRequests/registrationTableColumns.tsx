import {
  IconButton,
  StatusTag,
  Chip,
  CircleProgress,
} from 'cx-portal-shared-components'
import { GridColDef } from '@mui/x-data-grid'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import dayjs from 'dayjs'
import uniqueId from 'lodash/uniqueId'
import { useState } from 'react'
import { ApplicationRequest } from 'features/admin/applicationRequestApiSlice'

// Columns definitions of Registration Request page Data Grid
export const RegistrationRequestsTableColumns = (
  translationHook: any,
  onApproveClick: (id: string) => void,
  onDeclineClick: (id: string) => void,
  isLoading: boolean
): Array<GridColDef> => {
  const { t } = translationHook()
  const [selectedRowId, setSelectedRowId] = useState<string>('')

  return [
    {
      field: 'applicationId',
      headerName: t('content.admin.registration-requests.columns.request'),
      description: t(
        'content.admin.registration-requests.columns.requestDescription'
      ),
      flex: 2,
    },
    {
      field: 'dateCreated',
      headerName: t('content.admin.registration-requests.columns.date'),
      flex: 1.5,
      valueGetter: ({ row }: { row: ApplicationRequest }) =>
        dayjs(row.dateCreated).format('YYYY-MM-DD'),
    },

    {
      field: 'companyInfo',
      headerName: t('content.admin.registration-requests.columns.companyinfo'),
      flex: 2.5,
      sortable: false,
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <div>
          <p style={{ margin: '3px 0' }}>{row.companyName}</p>
          <p style={{ margin: '3px 0' }}>{row.email}</p>
          <span>{row.bpn}</span>
        </div>
      ),
    },
    {
      field: 'documents',
      headerName: t('content.admin.registration-requests.columns.documents'),
      flex: 2,
      sortable: false,
      cellClassName: 'documents-column--cell',
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <div className="document-cell-container">
          {row.documents.map((contract) => (
            <div
              className="document-cell-line"
              key={uniqueId(contract?.documentHash)}
            >
              <ArticleOutlinedIcon />
              <a href={contract?.documentHash} rel="noreferrer">
                {contract?.documentType}
              </a>
            </div>
          ))}
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
      flex: 1,
      sortable: false,
      renderCell: ({ row }: { row: ApplicationRequest }) => {
        if (row.applicationStatus === 'SUBMITTED')
          return (
            <div className="state-cell-container">
              {selectedRowId === row.applicationId && isLoading ? (
                <CircleProgress
                  size={40}
                  step={1}
                  interval={0.1}
                  colorVariant={'primary'}
                  variant={'indeterminate'}
                  thickness={8}
                />
              ) : (
                <>
                  <Chip
                    {...{
                      color: 'secondary',
                      variant: 'filled',
                      label: t(
                        'content.admin.registration-requests.buttondecline'
                      ),
                      type: 'decline',
                      onClick: () => {
                        setSelectedRowId(row.applicationId)
                        onDeclineClick(row.applicationId)
                      },
                      withIcon: true,
                    }}
                  />

                  <Chip
                    {...{
                      color: 'secondary',
                      variant: 'filled',
                      label: t(
                        'content.admin.registration-requests.buttonconfirm'
                      ),
                      type: 'confirm',
                      onClick: () => {
                        setSelectedRowId(row.applicationId)
                        onApproveClick(row.applicationId)
                      },
                      withIcon: true,
                    }}
                  />
                </>
              )}
            </div>
          )
        else
          return (
            <div className="state-cell-container">
              <StatusTag
                color={
                  row.applicationStatus === 'CONFIRMED'
                    ? 'confirmed'
                    : 'declined'
                }
                label={t(
                  `content.admin.registration-requests.cell${row.applicationStatus.toLowerCase()}`
                )}
              />
            </div>
          )
      },
    },
  ]
}
