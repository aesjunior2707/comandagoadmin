// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  css: ['./assets/css/main.css'],
  app: {
    head: {
      title: 'ComandaGo Admin',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Professional Restaurant Management System' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      appName: 'ComandaGo Admin',
      appVersion: '1.0.0'
    }
  }
})