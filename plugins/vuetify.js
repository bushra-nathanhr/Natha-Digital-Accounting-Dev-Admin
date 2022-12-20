import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export const Theme1 = {
  name:'Yellow',
  light:{
    // main colors
    primary: '#0A94FF',
    secondary: '#707070',
    accent1: '#895BF1',
    accent2: '#F3654A',
    accent3: '#FFB536',
    accent4: '#1AD598',
    navbar_bg : '#fff',
    dashboard_bg: '#F4F5F6',
    table_bg: '#F9FAFC',
    text: '#000027',
    text_light: '#fff',
    subtext: '#8D98A9',
    hint: '#B3BCCB',
    outline: '#E2E7F1',
    outline_dark: '#CED6E3',
    white: '#fff',
    black: '#000',

    // light colors
    light_primary: '#CEEAFF',
    light_accent1: '#E7DEFC',
    light_accent2: '#FDE0DB',
    light_accent3: '#FFF0D6',
    light_accent4: '#D1F7EA',
  },
  dark:{}
}

export default new Vuetify({
  breakpoint:{
    scrollBarWidth:5,
  },
  icons:{
    iconfont:'fa'
  },
  theme: { 
    themes:{
      light:Theme1.light,
      dark:Theme1.dark
    }
  },
})