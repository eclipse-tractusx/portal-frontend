import './InviteBusinessPartner.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  PageHeader,
  Table,
  Typography,
} from 'cx-portal-shared-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { fetchPage } from 'features/admin/registration/actions'
import { InvitesDataGrid } from 'features/admin/registration/types'
import { itemsSelector } from 'features/admin/registration/slice'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'

export default function InviteBusinessPartner() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const invitesData = useSelector(itemsSelector)
  const [failureOverlayOpen, setFailureOverlayOpen] = useState<boolean>(false)
  const [successOverlayOpen, setSuccessOverlayOpen] = useState<boolean>(false)
  const [invitesTableData, setInvitesTableData] = useState(
    invitesData as InvitesDataGrid[]
  )

  useEffect(() => {
    dispatch(fetchPage(0))
  }, [dispatch])

  useEffect(() => {
    // Adding "firstAndLastName" column to the invites table data
    setInvitesTableData(
      invitesData?.map((item: InvitesDataGrid) => ({
        ...item,
        firstAndLastName: `${item.firstName} ${item.lastName}`,
      }))
    )
  }, [invitesData])

  /*
  useEffect(() => {
    // close success overlay/dialog after 5 seconds
    if (successOverlayOpen) {
      setTimeout(() => {
        setSuccessOverlayOpen(false)
      }, 5000)
    }
  }, [successOverlayOpen])

*/
  return (
    <main className="invite-main-container">
      {/* success dialog/overlay */}
      <Dialog
        open={successOverlayOpen}
        sx={{ '.MuiDialog-paper': { maxWidth: '55%' } }}
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => setSuccessOverlayOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#939393',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography mt={7} mb={2} variant="body2" align="center">
            <CheckCircleOutlineIcon
              color="success"
              sx={{ width: 46, height: 46 }}
            />
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
      <Dialog
        open={failureOverlayOpen}
        sx={{ '.MuiDialog-paper': { maxWidth: '55%' } }}
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => setFailureOverlayOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#939393',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography mt={7} mb={2} variant="body2" align="center">
            <ErrorOutlineIcon color="error" style={{ height: 20, width: 20 }} />
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
          onClick={() => dispatch(show(OVERLAYS.INVITE))}
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
            },
          ]}
          rows={invitesTableData}
          getRowId={(row: { [key: string]: string }) => row.dateCreated}
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
