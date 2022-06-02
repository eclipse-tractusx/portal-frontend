import { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import FormHelperText from '@mui/material/FormHelperText'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
  UserDetails
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

interface AddTechnicalUserOverlayProps {
  dialogOpen: boolean
  handleClose: React.MouseEventHandler
  handleConfirm: React.MouseEventHandler
}

export const AddTechnicalUserOverlay = ({
  dialogOpen,
  handleClose,
  handleConfirm,
}: AddTechnicalUserOverlayProps) => {
  const { t } = useTranslation()
  const CHARACTER_LIMIT = 120
  const userDetailsData = [
    {
      cardCategory: 'Single Point of Contact (SPoC):',
      cardContentItems: {
        organizsationName: { label: "Organization name" , value: "BMW"},
        username: {label: "Username", value: "Max Mustermann"},
        eMailAddress: {label: "E-Mail Address", value: "test@test.de"}
      },
    },
  ]

  const [values, setValues] = useState({
    description: '',
    service: 'none'
  })

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogHeader
          title={t('content.addUser.technicalUserHeadline')}
          intro={t('content.addUser.technicalUserSubheadline')}
        />

        <DialogContent className="w-100">
          <Box sx={{ marginBottom: '23px'}}>
            <InputLabel error={true} sx={{ marginBottom: '7px' }}>
              {t('content.addUser.technicalUser.addOverlay.service')}
            </InputLabel>
            <Select
              value={values.service}
              variant="filled"
              fullWidth
              error={true}
              onChange={handleChange('service')}
              sx={{
                color: values.service === 'none' ? 'gray' : ''
              }}
            >
              <MenuItem disabled value="none">
                {t('global.actions.pleaseSelect')}
              </MenuItem>
              <MenuItem value="digitaltwin">Digital Twin</MenuItem>
              <MenuItem value="semantichub">Semantic Hub</MenuItem>
            </Select>
            <FormHelperText sx={{ marginBottom: '23px', color: 'red'}}>Error message!</FormHelperText>

            <InputLabel error={true} sx={{ marginBottom: '7px' }}>
              {t('content.addUser.technicalUser.addOverlay.description')}
            </InputLabel>
            <TextField
              variant="filled"
              value={values.description}
              placeholder={ t('content.addUser.technicalUser.addOverlay.description') }
              multiline
              fullWidth
              error={false}
              FormHelperTextProps={{
                sx: { marginLeft: 'auto' }
              }}
              helperText={`${values.description.length}/${CHARACTER_LIMIT}`}
              onChange={handleChange('description')}
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{ color: 'red' }} position="end">
                    <ErrorOutlineOutlinedIcon />
                  </InputAdornment>
                )
              }}
              inputProps={{
                maxLength: CHARACTER_LIMIT
              }}
            />
          </Box>
          <Box>
            <UserDetails
              columns={1}
              userDetailsCards={userDetailsData}
              variant='wide'
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
