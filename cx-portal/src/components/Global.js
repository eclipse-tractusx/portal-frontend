import { createGlobalStyle } from 'styled-components'
import styles from './styles/main.scss'

export const GlobalStyle = createGlobalStyle`
 body {
   ${styles}
 }`
