import './InviteBusinessPartner.scss';
import { Api as AdminRegistrationApi } from 'features/admin/registration/api'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button, Dialog, DialogContent, IconButton, PageHeader, Table, Typography } from 'cx-portal-shared-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { fetchPage } from 'features/admin/registration/actions';
import { InviteData, InvitesDataGrid } from 'features/admin/registration/types'
import { InviteFormContent } from './components/InviteForm/InviteFormContent'
import { itemsSelector } from 'features/admin/registration/slice';
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function InviteBusinessPartner() {
  const dispatch = useDispatch()
  const invitesData = useSelector(itemsSelector)
  const { t } = useTranslation()
  const [failureOverlayOpen, setFailureOverlayOpen] = useState<boolean>(false)
  const [inviteOverlayOpen, setInviteOverlayOpen] = useState<boolean>(false)
  const [invitesTableData, setInvitesTableData] = useState(invitesData as InvitesDataGrid[])
  const [processing, setProcessing] = useState<string>('input')
  const [successOverlayOpen, setSuccessOverlayOpen] = useState<boolean>(false)

  useEffect(() => {
    // Adding "firstAndLastName" column to the invites table data
    setInvitesTableData(invitesTableData?.map((item: InvitesDataGrid) => (
      { ...item, firstAndLastName: `${item.firstName} ${item.lastName}` }
    )))
  }, [])

  useEffect(() => {
    dispatch(fetchPage(0))
  }, [dispatch])

  useEffect(() => {
    // close success overlay/dialog after 5 seconds
    if (successOverlayOpen) {
      setTimeout(() => {
        setSuccessOverlayOpen(false)
      }, 5000)
    }
  }, [successOverlayOpen]);

  const doSubmitInvite = (data: InviteData) => {
    setProcessing('busy')
    new AdminRegistrationApi()
      .postInviteBusinessPartner(data)
      .then(() => {
        setSuccessOverlayOpen(true)
        setInviteOverlayOpen(false)
      })
      .catch((error: unknown) => {
        console.log(error)
        setFailureOverlayOpen(true)
        setInviteOverlayOpen(false)
      })
      .finally(() => {
        setTimeout(() => {
          setProcessing('input')
        }, 5000)
      })
  }

  return (
    <main className="invite-main-container">
      <InviteFormContent
        openDialog={inviteOverlayOpen}
        handleOverlayClose={() => setInviteOverlayOpen(false)}
        onSubmit={doSubmitInvite}
        state={processing}
      />

      {/* success dialog/overlay */}
      <Dialog open={successOverlayOpen} sx={{ '.MuiDialog-paper': { maxWidth: '55%' } }}>
        <DialogContent >
          <IconButton
            aria-label="close"
            onClick={() => setSuccessOverlayOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#939393'
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography mt={7} mb={2} variant="body2" align="center">
            <CheckCircleOutlineIcon color='success' sx={{ width: 46, height: 46 }} />
          </Typography>
          <Typography mb={2} variant="h4" align="center">
            {t('content.invite.success')}
          </Typography>
          <Typography variant="body2" align="center">
            {t('content.invite.successSubText')}
          </Typography>
        </DialogContent>
      </Dialog>

      {/* failure dialog/overlay */}
      <Dialog open={failureOverlayOpen} sx={{ '.MuiDialog-paper': { maxWidth: '55%' } }}>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => setFailureOverlayOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#939393'
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography mt={7} mb={2} variant="body2" align="center">
            <ErrorOutlineIcon color='error' style={{ height: 20, width: 20 }} />
          </Typography>
          <Typography mb={2} variant="h4" align="center">
            {t('content.invite.failure')}
          </Typography>
          <Typography variant="body2" align="center">
            {t('content.invite.failureSubText')}
          </Typography>
        </DialogContent>
      </Dialog>

      <PageHeader
        title={t('content.invite.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>

      <section>
        <Typography variant="h3" mb={3} align="center">
          {t('content.invite.subHeaderTitle')}
        </Typography>
        <Typography variant="body2" align="center">
          {t('content.invite.inviteText1')}
        </Typography>
        <Typography variant="body2" mb={3} align="center">
          {t('content.invite.inviteText2')}
        </Typography>
        <Button
          onClick={() => setInviteOverlayOpen(true)}
          size="medium"
          sx={{ margin: 'auto', display: 'block' }}
        >
          {t('content.invite.invite')}
        </Button>

        <Table
          title={t('content.invite.tabletitle')}
          columns={[
            {
              field: 'applicationId',
              hide: true,
            },
            {
              field: 'companyName',
              headerName: `${t('content.invite.columns.companyName')}`,
              flex: 1,
            },
            {
              field: 'firstAndLastName',
              headerName: `${t('content.invite.columns.firstAndLastName')}`,
              flex: 1,
            },
            {
              field: 'dateCreated',
              headerName: `${t('content.invite.columns.date')}`,
              flex: 1,
              // renderCell: rowData => moment(rowData.dateCreated).format('DD-MM-YYYY')
            },
            {
              field: 'applicationStatus',
              headerName: `${t('content.invite.columns.status')}`,
              flex: 1,
            },
            {
              field: 'details',
              headerName: `${t('content.invite.columns.details')}`,
              flex: 1,
              sortable: false,
              renderCell: () => (
                <IconButton
                  color="secondary"
                  onClick={() => console.log('on details click')}
                >
                  <ArrowForwardIcon />
                </IconButton>
              ),
            }
          ]}
          rows={invitesTableData}
          getRowId={(row: { [key: string]: string }) => row.applicationId}
          sx={{ marginTop: '80px' }}
          disableColumnMenu
          hideFooter
          toolbar={{
            onSearch: () => {
              console.log('search function')
            },
            onFilter: () => {
              console.log('filter function')
            },
          }}
        />
      </section>
    </main>
  )
}