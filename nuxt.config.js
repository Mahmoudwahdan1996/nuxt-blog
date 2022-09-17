export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "MW Blog",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "My cool web Development Blog ",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,500;1,700&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/styles/main.css"],

  loading: { color: "#fa923f", height: "4px", duration: 5000 },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~plugins/core-components.js", "~plugins/date-filter.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  axios: {
    baseURL:
      process.env.BASE_URL ||
      "https://nuxt-blog-4c15e-default-rtdb.firebaseio.com",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseUrl:
      process.env.BASE_URL ||
      "https://nuxt-blog-4c15e-default-rtdb.firebaseio.com",
    fbAPIKey: "AIzaSyAzu8-tOF_wzDDX7ux8iPJJALUvvSQy18w",
  },

  // rootDir:{}

  // router: {
  // base:'/my-app/',
  // extendRoutes(routes, resolve) {
  //   routes.push({
  //     path: "*",
  //     component: resolve(__dirname, "pages/index.vue"),
  //   });
  // },
  // linkActiveClass:'active',
  // middleware:'log'
  // },

  // srcDir:'client-app' //  clint-appلما اكون عاوذ احط فولرات الكومبوننت والبيردجز وغيرها من الفولدرات في فولدر واحد امه

  transition: {
    name: "fade",
    mode: "out-in",
  },

  serverMiddleware: [],
};
