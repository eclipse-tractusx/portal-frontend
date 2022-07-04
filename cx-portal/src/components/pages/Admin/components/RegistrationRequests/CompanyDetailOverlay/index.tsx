import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
} from 'cx-portal-shared-components'
import { Box, Grid, useTheme, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { adminRegistrationSelector } from 'features/admin/registration/slice'
import DetailGridRow from 'components/pages/PartnerNetwork/BusinessPartnerDetailOverlay/DetailGridRow'

interface CompanyDetailOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
}

const CompanyDetailOverlay = ({
  openDialog = false,
  handleOverlayClose,
}: CompanyDetailOverlayProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing } = theme
  const { detailLoading, companyDetail: selectedCompany } = useSelector(
    adminRegistrationSelector
  )

  return (
    <div className={'company-detail-overlay'}>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: 700,
          },
        }}
      >
        <DialogHeader
          {...{
            title: t(
              'content.admin.registration-requests.overlay.companydatatitle'
            ),
            closeWithIcon: true,
            onCloseWithIcon: handleOverlayClose,
          }}
        />

        {detailLoading ? (
          <div
            style={{
              height: '100px',
              textAlign: 'center',
              padding: '30px',
            }}
          >
            <CircularProgress
              size={35}
              sx={{
                color: theme.palette.primary.main,
                zIndex: 1,
                position: 'absolute',
              }}
            />
          </div>
        ) : (
          <DialogContent
            sx={{
              padding: '0 120px',
              marginBottom: 5,
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={1.5} style={{ marginTop: 0 }}>
                <Grid
                  xs={12}
                  item
                  style={{
                    backgroundColor: theme.palette.grey['100'],
                    padding: spacing(2),
                  }}
                >
                  <Typography variant="h5">
                    {t('content.admin.registration-requests.overlay.title')}
                  </Typography>
                </Grid>
                <DetailGridRow
                  key={t('content.partnernetwork.columns.name') as string}
                  {...{
                    variableName: `${t('content.partnernetwork.columns.name')}`,
                    value: selectedCompany?.name,
                  }}
                />
                <DetailGridRow
                  key={t('content.partnernetwork.columns.bpn') as string}
                  {...{
                    variableName: `${t('content.partnernetwork.columns.bpn')}`,
                    value: selectedCompany?.bpn,
                  }}
                />
                <DetailGridRow
                  key={
                    t(
                      'content.admin.registration-requests.overlay.taxid'
                    ) as string
                  }
                  {...{
                    variableName: `${t(
                      'content.admin.registration-requests.overlay.taxid'
                    )}`,
                    value: selectedCompany?.taxId,
                  }}
                />
                <Grid
                  xs={12}
                  item
                  style={{
                    backgroundColor: theme.palette.grey['100'],
                    padding: spacing(2),
                  }}
                >
                  <Typography variant="h5">Address</Typography>
                </Grid>
                <DetailGridRow
                  key="Street"
                  {...{
                    variableName: 'Street',
                    value: `${selectedCompany?.streetname} ${selectedCompany?.streetnumber}`,
                  }}
                />
                <DetailGridRow
                  key="PLZ / City"
                  {...{
                    variableName: 'PLZ / City',
                    value: `${selectedCompany?.zipcode} ${selectedCompany?.city}`,
                  }}
                />
                <DetailGridRow
                  key="Country"
                  {...{
                    variableName: 'Country',
                    value: selectedCompany?.countryDe,
                  }}
                />
              </Grid>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

export default CompanyDetailOverlay
