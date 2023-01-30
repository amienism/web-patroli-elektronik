// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const lightTheme = {
  dark: false,
  colors: {
    primary: '#0A234C',
    'primary-lighten': '#e9efff',
    secondary: '#404F7D',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
    }
  }
})