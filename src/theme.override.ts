import {
  type Theme,
  createTheme,
  type ThemeOptions,
} from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { theme } from '@catena-x/portal-shared-components'
import createPalette, { type Palette } from '@mui/material/styles/createPalette'
import createTypography, {
  type Typography,
} from '@mui/material/styles/createTypography'

export const getFontFamily = (name: string): string =>
  [
    `"${name}"`,
    '-apple-system',
    '"Karbon"',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
    'serif',
  ].join(',')

export enum FONT_PALETTE {
  PRIMARY = '"Karbon", Arial, Sans-serif, Serif',
  SECONDARY = '"Karbon", Arial, Sans-serif, Serif',
  PRIMARY_SEMI_BOLD = '"Karbon", Arial, Sans-serif, Serif',
  PRIMARY_LIGHT = '"Karbon", Arial, Sans-serif, Serif',
}
export enum COLOR_PALETTE {
  WHITE = '#ffffff',
  BLACK = '#000000',
  PRIMARY = '#D31184',
  PRIMARY_HOVER = '#A60F68',
  SECONDARY = '#4D4D4D',
  SECONDARY_HOVER = '#333333',
  SUCCESS = '#6BA13C',
  SUCCESS_LIGHT = '#DBEBB0',
  SUCCESS_DARK = '#406124',
  ERROR = '#B62100',
  ERROR_EXTRA_LIGHT = '#F8E9E6',
  ERROR_LIGHT = '#F0D3CC',
  ERROR_DARK = '#6D1400',

  INFO = '#0F71CB',
  INFO_LIGHT = '#EAF1FE',
  INFO_DARK = '#0D55AF',
  WARNING = '#F58220',
  WARNING_LIGHT = 'rgba(245, 130, 32, 0.15)',
  WARNING_DARK = '#B95B09',
  GRAY = '#A6A6A6',
  LIGHT_GRAY = '#F6F6F6',
  BOX_SHADOW = 'rgba(223, 223, 223,1)',
}
export enum TEXT_PALETTE {
  PRIMARY = '#111111',
  SECONDARY = '#252525',
  TERTIARY = '#888888',
  QUATERNARY = '#A2A2A2',
}

export enum COLOR_PALETTE_CHIP {
  PENDING_MAIN = '#FFF6E5',
  PENDING_CONTRASTTEXT = '#EA730B',
  CONFIRMED_MAIN = '#DBEBB0',
  CONFIRMED_CONTRASTTEXT = '#406124',
  DECLINED_MAIN = '#F0D3CC',
  DECLINED_CONTRASTTEXT = '#B62100',
  INFO_MAIN = '#EAF1FE ',
  INFO_CONTRASTTEXT = '#0F71CB',
  LABEL_MAIN = '#DFDFDF',
  LABEL_CONTRASTTEXT = '#000000',
}
export const paletteDefinitions = {
  common: {
    white: '#ffffff',
    black: '#000000',
  },
  primary: {
    main: COLOR_PALETTE.PRIMARY,
    dark: COLOR_PALETTE.PRIMARY_HOVER,
    contrastText: COLOR_PALETTE.WHITE,
    light: COLOR_PALETTE.GRAY,
    shadow: COLOR_PALETTE.PRIMARY,
  },
  secondary: {
    main: COLOR_PALETTE.SECONDARY,
    dark: COLOR_PALETTE.BLACK,
    light: COLOR_PALETTE.GRAY,
    contrastText: COLOR_PALETTE.WHITE,
  },
  brand: {
    brand01: COLOR_PALETTE.PRIMARY,
    brand02: COLOR_PALETTE.SUCCESS,
  },
  action: {
    active: COLOR_PALETTE.WHITE,
    disabled: '#ffffff',
    disabledBackground: COLOR_PALETTE.GRAY,
  },
  danger: {
    danger: COLOR_PALETTE.ERROR,
    dangerHover: '#E5231D',
    dangerBadge: '#FB6540',
  },
  support: {
    success: COLOR_PALETTE.SUCCESS,
    error: COLOR_PALETTE.ERROR,
    info: COLOR_PALETTE.INFO,
    warning: COLOR_PALETTE.WARNING,
  },
  success: {
    main: COLOR_PALETTE.SUCCESS,
    dark: COLOR_PALETTE.SUCCESS_DARK,
    light: COLOR_PALETTE.SUCCESS_LIGHT,
  },
  error: {
    main: COLOR_PALETTE.ERROR,
    dark: COLOR_PALETTE.ERROR_DARK,
    light: COLOR_PALETTE.ERROR_LIGHT,
  },
  info: {
    main: COLOR_PALETTE.INFO,
    dark: COLOR_PALETTE.INFO_DARK,
    light: COLOR_PALETTE.INFO_LIGHT,
    contrastText: COLOR_PALETTE.BLACK,
  },
  warning: {
    main: COLOR_PALETTE.WARNING,
    dark: COLOR_PALETTE.WARNING_DARK,
    light: COLOR_PALETTE.WARNING_LIGHT,
    contrastText: COLOR_PALETTE.WHITE,
  },

  icon: {
    icon01: '#939393',
    icon02: '#B6B6B6',
    icon03: '#333333',
  },
  border: {
    border01: '#DCDCDC',
    border02: '#B6B6B6',
    border03: '#989898',
    border04: COLOR_PALETTE.INFO,
  },
  chip: {
    release: '#0D61AE',
    active: '#88982D',
    inactive: '#D91E18',
    created: '#8f8013',
    inReview: '#8f8013',
    enabled: '#007877',
    default: '#888888',
    bgRelease: '#EAF1FE',
    bgActive: '#F0F5D5',
    bgInactive: '#FFF7FF',
    bgCreated: '#f5efd5',
    bgInReview: '#f5efd5',
    bgEnabled: '#DEEEEF',
    bgDefault: '#c7c5c5',
  },
  stepper: {
    stepDone: COLOR_PALETTE.SUCCESS,
    stepCurrent: COLOR_PALETTE.WARNING,
    stepUpcoming: COLOR_PALETTE.INFO,
  },
  background: {
    background01: '#ffffff',
    background02: '#F3F3F3',
    background03: '#E9E9E9',
    background04: '#F4FBFD',
    background05: '#F5F9EE',
    background06: '#FFF7EC',
    background07: '#F5F5F5',
    background08: '#FFF6FF',
    background09: COLOR_PALETTE.LIGHT_GRAY,
    background10: '#303030F2',
    background11: '#EDEFF2',
    background12: '#8E8E8E1A',
    background13: '#DFE4EA',
    background14: '#303030',
  },
  textField: {
    placeholderText: '#8D8D8D',
    helperText: '#717171',
    background: '#F7F7F7',
    backgroundHover: '#ECECEC',
  },
  text: {
    primary: '#111111',
    secondary: '#252525',
    tertiary: '#888888',
    quaternary: '#A2A2A2',
  },
  accent: {
    accent01: '#4D73D5',
    accent02: '#EDEDED',
    accent03: COLOR_PALETTE.SECONDARY_HOVER,
    accent04: '#E1F1FF',
    accent05: '#FFEBCC',
    accent06: '#5E3416',
    accent07: '#88982D',
    accent08: '#F0F5D5',
    accent09: '#FDB943',
    accent10: '#428C5B',
    accent11: '#337B89',
    accent12: '#2B4078',
  },
  selected: {
    hover: '#EDEDED',
    focus: 'rgba(128, 128, 128, .2)',
    active: 'rgba(128, 128, 128, .3)',
  },
  pending: {
    main: '#FFF6E5',
    contrastText: '#EA730B',
  },
  confirmed: {
    main: '#DBEBB0',
    contrastText: '#406124',
  },
  declined: {
    main: '#F0D3CC',
    contrastText: '#B62100',
  },
  label: {
    main: '#DFDFDF',
    contrastText: '#000000',
  },

  buttons: {
    darkGrey: '#e1e1e1',
    lightGrey: '#f3f3f3',
    white: '#f9f9f9',
    yellow: '#f5f9ee',
  },
}
export const palette = createPalette(paletteDefinitions as unknown as Palette)

export const registrationStatusColors = {
  inProgress: {
    backgroundColor: paletteDefinitions.accent.accent02,
    color: COLOR_PALETTE.SECONDARY,
    btnColor: COLOR_PALETTE.SECONDARY,
    textColor: COLOR_PALETTE.WHITE,
  },
  done: {
    backgroundColor: paletteDefinitions.buttons.yellow,
    color: COLOR_PALETTE.SUCCESS, // icon color
    btnColor: COLOR_PALETTE.SUCCESS_LIGHT,
    textColor: COLOR_PALETTE.SUCCESS_DARK,
  },
  failed: {
    backgroundColor: COLOR_PALETTE.ERROR_EXTRA_LIGHT,
    color: paletteDefinitions.chip.inactive,
    btnColor: COLOR_PALETTE.ERROR_LIGHT,
    textColor: COLOR_PALETTE.ERROR,
  },
  todo: {
    backgroundColor: paletteDefinitions.accent.accent02,
    color: COLOR_PALETTE.SECONDARY,
    btnColor: COLOR_PALETTE_CHIP.LABEL_MAIN,
    textColor: COLOR_PALETTE.BLACK,
  },
  default: {
    backgroundColor: paletteDefinitions.background.background08,
    color: paletteDefinitions.chip.inactive,
    btnColor: paletteDefinitions.chip.inactive,
    textColor: COLOR_PALETTE.ERROR,
  },
}

export const typographyDefinitions = {
  fontWeight: 400,
  htmlFontSize: 16,
  allVariants: {
    color: TEXT_PALETTE.PRIMARY,
  },
  h1: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600,
    fontSize: 58,
    lineHeight: '110%',
    letterSpacing: 0,
  },
  h2: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600,
    fontSize: 40,
    lineHeight: '110%',
    letterSpacing: 0,
  },
  h3: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600, // Conflict
    fontSize: 36,
    lineHeight: '110%',
    letterSpacing: 0,
  },
  h4: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600, // Conflict
    fontSize: 32,
    lineHeight: '110%',
    letterSpacing: 0,
  },
  h5: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '110%',
    letterSpacing: 0,
  },
  h6: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '110%',
    letterSpacing: 0,
  },
  body1: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '140%',
    letterSpacing: 0,
  },
  body2: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    letterSpacing: 0,
  },
  body3: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '140%',
    letterSpacing: 0,
  },

  label1: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '100%',
    letterSpacing: 0,
  },
  label2: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '100%',
    letterSpacing: 0,
  },
  label3: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '100%',
    letterSpacing: 0,
  },
  label4: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 500,
    fontSize: 14, // changed from 12 to 14 to match styles
    lineHeight: '100%',
    letterSpacing: 0,
  },
  label5: {
    fontFamily: getFontFamily('Karbon'),
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '100%',
    letterSpacing: 0,
    color: TEXT_PALETTE.SECONDARY,
  },
  caption0: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '100%',
    letterSpacing: 0,
    color: TEXT_PALETTE.TERTIARY,
  },
  caption1: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '100%',
    letterSpacing: 0,
    color: TEXT_PALETTE.TERTIARY,
  },
  caption2: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '100%',
    letterSpacing: 0,
    color: TEXT_PALETTE.TERTIARY,
  },
  caption3: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '100%',
    letterSpacing: 0,
    color: TEXT_PALETTE.TERTIARY,
  },
  helper: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '100%',
    letterSpacing: 0,
    color: TEXT_PALETTE.TERTIARY,
  },
  button: {
    fontSize: 16,
    lineHeight: 24 / 16,
  },
}
export const typography = createTypography(
  palette as unknown as Palette,
  typographyDefinitions as unknown as Typography
)

export const customTheme = {
  palette,
  typography,
  components: {
    body: {
      styleOverrides: {
        '& .header-section img': {
          background:
            'rgba(250, 250, 250, 1) url(/assets/images-cfx/banners/Pattern-Cfx.svg) top right no-repeat',
          backgroundSize: 'contain',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: FONT_PALETTE.PRIMARY,
        },
        caption3: {
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: '24px',
          color: `${COLOR_PALETTE.PRIMARY} !important`,
        },
        helper: {
          color: `${COLOR_PALETTE.BLACK} !important`,
        },
      },
    },
    MuiCollapse: {
      styleOverrides: {
        vertical: {
          '& .MuiTypography-caption3': {
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '140%',
            color: `${COLOR_PALETTE.SECONDARY} !important`,
          },
          '& .MuiCollapse-wrapperInner .MuiPaper-elevation': {
            background: 'none !important',
          },
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontFamily: FONT_PALETTE.PRIMARY,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          fontFamily: FONT_PALETTE.PRIMARY,
          '&.MuiTextField-root .MuiAutocomplete-tag': {
            color: COLOR_PALETTE.SECONDARY,
            height: '32px',
          },
          '& .MuiInputBase-root.MuiFilledInput-root.MuiInputBase-multiline': {
            padding: 0,
          },
          '&.MuiTextField-root .MuiAutocomplete-tag .MuiChip-label': {
            fontWeight: 500,
            fontSize: '16px !important',
          },
          '&.MuiTextField-root .MuiAutocomplete-endAdornment .MuiAutocomplete-popupIndicator':
            {
              color: COLOR_PALETTE.SECONDARY,
            },
          '&.MuiTextField-root .MuiAutocomplete-endAdornment .MuiSvgIcon-root':
            {
              color: COLOR_PALETTE.SECONDARY,
            },
          '&.MuiTextField-root .MuiAutocomplete-endAdornment .MuiIconButton-root':
            {
              backgroundColor: 'transparent !important',
            },
          '& textarea': {
            fontSize: 20,
            backgroundColor: '#FAFAFA',
            border: 0,
            borderBottom: '1px solid #4D4D4D',
            lineHeight: '24px',
            padding: 20,
            fontFamily: FONT_PALETTE.PRIMARY,
            outline: 'none !important',
            height: '150px !important',
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        '&.Mui-disabled': {
          color: COLOR_PALETTE.BLACK,
          backgroundColor: COLOR_PALETTE.BLACK,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: FONT_PALETTE.PRIMARY,
          fontSize: '18px',
          fontWeight: 400,
          color: COLOR_PALETTE.PRIMARY,

          ':hover': {
            color: COLOR_PALETTE.BLACK,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          // color: COLOR_PALETTE.SECONDARY,
          fontFamily: FONT_PALETTE.PRIMARY,
          fontSize: '20px',
          fontWeight: 400,
          '&.MuiAlert-colorError': {
            background: COLOR_PALETTE.ERROR_LIGHT,
          },
          '&.MuiAlert-colorWarning': {
            background: COLOR_PALETTE.WARNING_LIGHT,
          },
          '&.MuiAlert-colorInfo': {
            background: COLOR_PALETTE.INFO_LIGHT,
          },
          '&.MuiAlert-colorSuccess': {
            background: COLOR_PALETTE.SUCCESS_LIGHT,
          },
        },

        message: {
          padding: '3px 0',
          color: `${COLOR_PALETTE.BLACK} !important`,
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontFamily: FONT_PALETTE.PRIMARY,
          fontSize: '18px',
          fontWeight: 400,
        },
        li: {
          fontSize: '18px',
          fontWeight: 400,
          '& p': {
            fontSize: '18px',
          },
        },
      },
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {},
      },
    },

    MuiCustomAccordion: {
      styleOverrides: {
        titleIcon: {
          background: COLOR_PALETTE.BLACK,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: '600',
          fontFamily: FONT_PALETTE.PRIMARY,
          '&.Mui-disabled': {
            background: COLOR_PALETTE.GRAY,
          },
          ':focus': {
            // boxShadow: `0px 0px 0px 2px ${COLOR_PALETTE.BOX_SHADOW}`,
            // color: COLOR_PALETTE.WHITE,
            // backgroundColor: COLOR_PALETTE.SECONDARY,
          },
          ':active': {
            boxShadow: `0px 0px 0px 2px ${COLOR_PALETTE.BOX_SHADOW}`,
            color: COLOR_PALETTE.WHITE,
            backgroundColor: COLOR_PALETTE.SECONDARY,
          },
          ':hover': {
            // boxShadow: `0px 0px 0px 2px ${COLOR_PALETTE.BOX_SHADOW}`,
          },

          '& .MuiButton-icon .MuiCircularProgress-root .MuiCircularProgress-circle':
            {
              color: COLOR_PALETTE.WHITE,
            },
          // '&.MuiButton-outlined': {
          //   backgroundColor: COLOR_PALETTE.PRIMARY,
          //   color: COLOR_PALETTE.WHITE,
          // },
          // '&.MuiButton-outlined:hover': {
          //   backgroundColor: COLOR_PALETTE.PRIMARY_HOVER,
          //   color: COLOR_PALETTE.WHITE,
          // },
          // '&.MuiButton-contained': {
          //   color: COLOR_PALETTE.SECONDARY,
          //   backgroundColor: COLOR_PALETTE.WHITE,
          //   borderColor: `${COLOR_PALETTE.SECONDARY} !important`,
          // },
        },
        sizeLarge: {
          padding: '14px 40px',
        },
        sizeMedium: {
          padding: '14px 24px',
        },
        sizeSmall: {
          padding: '10px 18px',
          fontSize: '16px',
        },
        outlined: {
          borderColor: COLOR_PALETTE.SECONDARY,
          color: COLOR_PALETTE.SECONDARY,
          ':hover': {
            // color: COLOR_PALETTE.SECONDARY_HOVER,
            borderColor: COLOR_PALETTE.SECONDARY_HOVER,
            borderWidth: 2,
            // backgroundColor: 'transparent',
            boxShadow: `0px 0px 0px 2px ${COLOR_PALETTE.BOX_SHADOW}`,
            color: COLOR_PALETTE.WHITE,
            backgroundColor: COLOR_PALETTE.SECONDARY,
          },
          ':disabled': {
            borderColor: COLOR_PALETTE.LIGHT_GRAY,
            borderWidth: 2,
          },
        },

        outlinedSizeMedium: {
          padding: '12px 22px',
        },
        outlinedSizeSmall: {
          padding: '8px 16px',
        },
        text: {
          borderColor: COLOR_PALETTE.SECONDARY,
          color: COLOR_PALETTE.SECONDARY,
          ':hover': {
            backgroundColor: COLOR_PALETTE.LIGHT_GRAY,
          },
        },

        ':hover': {},
      },
      variants: [
        {
          props: {
            color: 'secondary',
          },
          style: {
            color: COLOR_PALETTE.WHITE,
            backgroundColor: COLOR_PALETTE.SECONDARY,
            ':hover': {
              color: COLOR_PALETTE.WHITE,
              backgroundColor: COLOR_PALETTE.BLACK,
            },
          },
        },

        {
          props: {
            color: 'success',
          },
          style: {
            color: COLOR_PALETTE.WHITE,
            backgroundColor: COLOR_PALETTE.SUCCESS,
            ':hover': {
              color: COLOR_PALETTE.WHITE,
              backgroundColor: COLOR_PALETTE.SUCCESS_DARK,
            },
          },
        },
        {
          props: {
            color: 'info',
          },
          style: {
            color: COLOR_PALETTE.WHITE,
            backgroundColor: COLOR_PALETTE.INFO,
            ':hover': {
              color: COLOR_PALETTE.WHITE,
              backgroundColor: COLOR_PALETTE.INFO_DARK,
            },
          },
        },
        {
          props: {
            color: 'warning',
          },
          style: {
            color: COLOR_PALETTE.WHITE,
            backgroundColor: COLOR_PALETTE.WARNING,
            ':hover': {
              color: COLOR_PALETTE.WHITE,
              backgroundColor: COLOR_PALETTE.WARNING_DARK,
            },
          },
        },
        {
          props: {
            color: 'error',
          },
          style: {
            color: COLOR_PALETTE.WHITE,
            backgroundColor: COLOR_PALETTE.ERROR,
            ':hover': {
              color: COLOR_PALETTE.WHITE,
              backgroundColor: COLOR_PALETTE.ERROR_DARK,
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: COLOR_PALETTE.PRIMARY,
          padding: 6,
          ':hover': {
            backgroundColor: COLOR_PALETTE.BLACK,
            color: COLOR_PALETTE.WHITE,
            // boxShadow: `0px 0px 0px 2px ${COLOR_PALETTE.BOX_SHADOW}`,
          },
          ':focus': {
            boxShadow: `0px 0px 0px 2px ${COLOR_PALETTE.BOX_SHADOW}`,
          },
          ':active': {
            boxShadow: `0px 0px 0px 2px ${COLOR_PALETTE.BOX_SHADOW}`,
          },
        },
      },
      variants: [
        {
          props: {
            color: 'primary',
          },
          style: {
            borderColor: COLOR_PALETTE.SECONDARY,
            color: COLOR_PALETTE.WHITE,
            backgroundColor: COLOR_PALETTE.SECONDARY,
            ':hover, :focus, :active': {
              backgroundColor: COLOR_PALETTE.BLACK,
              color: COLOR_PALETTE.WHITE,
              borderColor: COLOR_PALETTE.BLACK,
            },
          },
        },
        {
          props: {
            color: 'secondary',
          },
          style: {
            borderColor: COLOR_PALETTE.SECONDARY,
            color: COLOR_PALETTE.SECONDARY,
            backgroundColor: COLOR_PALETTE.WHITE,
            ':hover, :focus, :active': {
              borderColor: COLOR_PALETTE.GRAY,
              color: COLOR_PALETTE.SECONDARY,
              backgroundColor: COLOR_PALETTE.LIGHT_GRAY,
            },
          },
        },

        {
          props: {
            size: 'small',
          },
          style: {
            padding: 2,
          },
        },
      ],
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          '& .actions-main': {
            backgroundColor: COLOR_PALETTE.LIGHT_GRAY,
            borderColor: COLOR_PALETTE.LIGHT_GRAY,
          },
        },
      },
    },
    MuiChip: {
      defaultProps: {
        disableRipple: true,
        disableAnimation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: '37px',
          marginBottom: '10px',
        },
        label: {
          fontWeight: 500,
          fontFamily: FONT_PALETTE.PRIMARY,
          fontSize: '18px',
          padding: '6px 12px',
          lineHeight: '140%',
        },
      },
      variants: [
        {
          props: {
            color: 'pending',
          },
          style: {
            backgroundColor: COLOR_PALETTE_CHIP.PENDING_MAIN,
            color: COLOR_PALETTE_CHIP.PENDING_CONTRASTTEXT,
          },
        },
        {
          props: {
            color: 'confirmed',
          },
          style: {
            backgroundColor: COLOR_PALETTE_CHIP.CONFIRMED_MAIN,
            color: COLOR_PALETTE_CHIP.CONFIRMED_CONTRASTTEXT,
          },
        },
        {
          props: {
            color: 'declined',
          },
          style: {
            backgroundColor: COLOR_PALETTE_CHIP.DECLINED_MAIN,
            color: COLOR_PALETTE_CHIP.DECLINED_CONTRASTTEXT,
          },
        },
        {
          props: {
            color: 'info',
          },
          style: {
            backgroundColor: COLOR_PALETTE_CHIP.INFO_MAIN,
            color: COLOR_PALETTE_CHIP.INFO_CONTRASTTEXT,
          },
        },
        {
          props: {
            color: 'label',
          },
          style: {
            backgroundColor: COLOR_PALETTE_CHIP.LABEL_CONTRASTTEXT,
            color: COLOR_PALETTE_CHIP.LABEL_MAIN,
          },
        },
      ],
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeaderTitle: {
          fontSize: 16,
          fontFamily: FONT_PALETTE.PRIMARY,
        },
        virtualScroller: {
          textAlign: 'center',
          '& .MuiDataGrid-overlayWrapperInner': {
            textAlign: 'center',
          },
        },
        cell: {
          fontSize: 16,
          '& .Mui-disabled': {
            color: COLOR_PALETTE.GRAY,
          },
          '& .MuiButton-root.Mui-disabled': {
            color: COLOR_PALETTE.WHITE,
          },
          '& .MuiDataGrid-cellContent': {
            fontSize: 16,
          },
        },
        row: {
          '&.Mui-selected,&:hover,&:focus': {
            backgroundColor: `${COLOR_PALETTE.LIGHT_GRAY} !important`,
          },
        },
        root: {
          borderRadius: 0,
          '& .MuiTypography-root a': {
            fontSize: 16,
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiPaper-elevation': {
            border: 'none !important',
            boxShadow: '2px 2px 20px 0px rgba(77, 77, 77, 0.25) !important',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
        input: {
          fontSize: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 16,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${COLOR_PALETTE.SECONDARY}`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${COLOR_PALETTE.SECONDARY}`,
          },
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FAFAFA',
          fontSize: 20,
          paddingRight: '20px',
          '&:before': {
            borderColor: COLOR_PALETTE.GRAY,
          },
          '&:after': {
            backgroundColor: COLOR_PALETTE.GRAY,
            borderColor: COLOR_PALETTE.GRAY,
          },
          '&.Mui-focused:after': {
            backgroundColor: COLOR_PALETTE.SECONDARY,
            borderColor: COLOR_PALETTE.SECONDARY,
          },
        },
        input: {
          fontSize: 20,
        },
      },
    },

    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          '& .MuiDayCalendar-weekContainer ,MuiButtonBase-root': {
            backgroundColor: COLOR_PALETTE.PRIMARY,
            borderColor: COLOR_PALETTE.PRIMARY,
          },
        },
        input: {
          fontSize: 20,
        },
      },
    },

    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '&:hover .MuiSvgIcon-root': {
            color: COLOR_PALETTE.PRIMARY,
          },
          '&:hover .MuiButtonBase-root, &:active .MuiButtonBase-root,&:focus .MuiButtonBase-root':
            {
              background: 'none',
              border: 'none',
            },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '& .MuiMenuItem-root': {
            fontWeight: 500,
            padding: '14px 14px',
            boxShadow: 'none !important',
          },
          '& .MuiMenuItem-root.Mui-selected': {
            background: `${COLOR_PALETTE.LIGHT_GRAY} !important`,
          },
          '& .MuiListItem-root': {
            // padding: 0,
          },
          '& .MuiListItem-root a': {
            fontWeight: 500,
            fontSize: '16px',
            borderRadius: 0,
            color: COLOR_PALETTE.BLACK,
          },
          '& .MuiListItem-root:hover a': {
            color: COLOR_PALETTE.BLACK,
            backgroundColor: COLOR_PALETTE.LIGHT_GRAY,
          },
        },
        padding: {
          margin: '0',
          padding: '0',
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover a .MuiSvgIcon-root': {
            color: COLOR_PALETTE.BLACK,
            backgroundColor: COLOR_PALETTE.LIGHT_GRAY,
          },
          '& .MuiTypography-root.MuiTypography-inherit.MuiLink-root.MuiLink-underlineAlways.MuiTypography-root.MuiTypography-inherit.MuiLink-root.MuiLink-underlineAlways .MuiBox-root':
            {
              color: `${COLOR_PALETTE.BLACK} !important`,
              backgroundColor: COLOR_PALETTE_CHIP.LABEL_MAIN,
            },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          '&.MuiAvatar-circular.MuiAvatar-colorDefault': {
            backgroundColor: COLOR_PALETTE.SECONDARY,
          },
          '&.MuiAvatar-circular.MuiAvatar-colorDefault:hover': {
            backgroundColor: COLOR_PALETTE.BLACK,
          },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#d2d2d2',
        },
        bar: {
          backgroundColor: COLOR_PALETTE.SECONDARY,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          // to-check
          // color: COLOR_PALETTE.PRIMARY,
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: '40px',
          fontFamily: FONT_PALETTE.PRIMARY,
          '&.Mui-expanded': {
            minHeight: '40px',
            background: COLOR_PALETTE.LIGHT_GRAY,
          },
        },
        content: {
          margin: '12px 0 12px',
          fontSize: '20px',
          overflow: 'hidden',
          height: 'auto',
          '& .MuiSvgIcon-root': {
            color: COLOR_PALETTE.SECONDARY,
          },
          '& .MuiTypography-h4': {
            fontSize: '18px',
          },
          '&.Mui-expanded': {
            margin: '12px 0 12px',
            padding: 0,
          },
        },
        expandIconWrapper: {
          '& .MuiSvgIcon-root': {
            color: COLOR_PALETTE.SECONDARY,
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          '&.errorBar': {
            color: COLOR_PALETTE.ERROR,
          },
          '&.errorBar .iconWithText': {
            color: COLOR_PALETTE.ERROR,
          },
          '&.errorBar .iconWithText p': {
            fontSize: '18px',
            fontWeight: '500',
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        icon: {
          '& .MuiSvgIcon-root': {
            color: '#faaf00',
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        vertical: {
          color: COLOR_PALETTE.BLACK,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: FONT_PALETTE.PRIMARY,
          lineHeight: '140%',
          fontSize: '16px',
          '& .MuiSvgIcon-root': {
            color: COLOR_PALETTE.GRAY,
            height: '18px',
            padding: 0,
            margin: '3px 5px 3px 0',
          },
          '&.Mui-selected .MuiSvgIcon-root': {
            color: `${COLOR_PALETTE.PRIMARY} !important`,
          },
          '&:hover': {
            color: `${COLOR_PALETTE.BLACK} !important`,
          },
        },
      },
    },
  },
}
export const cofinityTheme = createTheme(
  deepmerge(theme as Theme, customTheme as ThemeOptions)
)
