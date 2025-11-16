// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },


  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxtjs/snipcart'
  ],
  snipcart: {
    publicApiKey: 'ZWM3ZGYxN2QtMWE1Yy00OTY2LWIwOTAtNDcyYjI0OTZhNDAwNjM4OTg4NDAzOTA2NjEyOTcy'
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js',
          async: true
        }
      ]
    }
  }
})