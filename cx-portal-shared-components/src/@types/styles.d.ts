import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypeIcons {
    icon01: string
    icon02: string
    icon03: string
  }

  interface TypeBrand {
    brand01: string
    brand02: string
  }

  interface TypeDanger {
    danger: string
    dangerHover: string
    dangerBadge: string
  }

  interface TypeSupport {
    success: string
    error: string
  }

  interface TypeBorders {
    border01: string
    border02: string
    border03: string
  }

  interface TypeBackground {
    background01: string
    background02: string
    background03: string
    background04: string
    background05: string
    background06: string
    background07: string
    background08: string
    background09: string
    background10: string
  }

  interface TypeTextField {
    placeholderText: string
    helperText: string
    background: string
    backgroundHover: string
  }

  interface TypeText {
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
  }

  interface TypeAccent {
    accent01: string
    accent02: string
    accent03: string
    accent04: string
    accent05: string
    accent06: string
    accent07: string
    accent08: string
    accent09: string
    accent10: string
    accent11: string
    accent12: string
  }

  interface TypeSelected {
    hover: string
    focus: string
    active: string
  }

  interface TypeChipColor {
    main: string
    contrastText: string
  }

  interface PaletteColor {
    shadow: string
  }

  interface SimplePaletteColorOptions {
    shadow?: string
  }

  interface Palette {
    icon: TypeIcons
    border: TypeBorders
    background: TypeBackground
    textField: TypeTextField
    text: TypeText
    brand: TypeBrand
    danger: TypeDanger
    support: TypeSupport
    accent: TypeAccent
    selected: TypeSelected
    pending: TypeChipColor
    confirmed: TypeChipColor
    declined: TypeChipColor
    label: TypeChipColor
  }
  interface PaletteOptions {
    icon?: Partial<TypeIcons>
    border?: Partial<TypeBorders>
    background?: Partial<TypeBackground>
    textField?: Partial<TypeTextField>
    text?: Partial<TypeText>
    brand?: Partial<TypeBrand>
    danger?: Partial<TypeDanger>
    support?: Partial<TypeSupport>
    accent?: Partial<TypeAccent>
    selected?: Partial<TypeSelected>
    pending?: Partial<TypeChipColor>
    confirmed?: Partial<TypeChipColor>
    declined?: Partial<TypeChipColor>
    label?: Partial<TypeChipColor>
  }

  interface TypographyVariants {
    body3: TypographyStyleOptions
    caption1: TypographyStyleOptions
    caption2: TypographyStyleOptions
    caption3: TypographyStyleOptions
    label1: TypographyStyleOptions
    label2: TypographyStyleOptions
    label3: TypographyStyleOptions
    label4: TypographyStyleOptions
    label5: TypographyStyleOptions
    helper: TypographyStyleOptions
  }

  interface TypographyVariantsOptions {
    body3?: TypographyStyleOptions
    caption1?: TypographyStyleOptions
    caption2?: TypographyStyleOptions
    caption3?: TypographyStyleOptions
    label1?: TypographyStyleOptions
    label2?: TypographyStyleOptions
    label3?: TypographyStyleOptions
    label4?: TypographyStyleOptions
    label5?: TypographyStyleOptions
    helper?: TypographyStyleOptions
  }
}
