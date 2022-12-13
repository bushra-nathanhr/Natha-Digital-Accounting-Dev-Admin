import colors from 'vuetify/es5/util/colors'

export default {

  // ** GLOBAL HEADER
  head: {
    titleTemplate: '%s - Accounting',
    title: 'Nathan Digital',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
      }
    ],
  },

  // ** GLOBAL CSS
  css: [ '@/assets/scss/global' ],

  // ** PLUGINS 
  plugins: [
    '@/plugins/vuetify.js',
    { src: '~/plugins/lineChart.js', mode: 'client' }
  ],

  // ** AUTO IMPORT COMPONENTS
  components: true,

  // ** DEVELOPMENT MODULES 
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/moment'
  ],

  // ** MODULES 
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-svg-loader',
  ],

  // ** AXIOS MODULE
  axios: {
    baseURL: '/',
  },

  // ** VUETIFY CONFIGURATIONS
  vuetify: {
    customVariables: ['@/assets/scss/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Manrope',
        size: 14
      },
      icons: 'fa'
    },
    treeShake: true,
  },

  // ** BUILD CONFIGURATIONS
  build: {
    postcss: null,
  },

  // ** SVG LOADER 
  svgLoader: {
    svgoConfig: {
      plugins: [
        { prefixIds: false } // Disables prefixing for SVG IDs
      ]
    }
  },

  // ** GOOGLE FONTS
  googleFonts: {
    families: {
      Manrope: true,
    },
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true
  }
}
