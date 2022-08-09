interface AddTechnicalUserOverlayProps {
  dialogOpen: boolean
  handleClose: React.MouseEventHandler
  handleConfirm: (formValues: DefaultFormFieldValuesType) => void
}

export type DefaultFormFieldValuesType = {
  TechnicalUserName: string
  TechnicalUserService: string
  TechnicalUserDescription: string
}
