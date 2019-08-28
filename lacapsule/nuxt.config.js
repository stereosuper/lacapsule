const pkg = require('./package');
const Prismic = require('prismic-javascript');

module.exports = {
    mode: 'universal',
    generate: {
        routes: async function() {
            const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
            const api = await Prismic.getApi(apiEndpoint);
            return await api.query('').then(res => {
                return res.results.reduce((acc, cur) => {
                    if (cur.uid !== null) acc.push(cur.uid);
                    return acc;
                }, []);
            });
        }
    },

    /*
  ** Headers of the page
  */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,600,600i'
            },
            {
                rel: 'dns-prefetch',
                href: '//fonts.googleapis.com'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossorigin: ''
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest'
            },
            {
                rel: 'mask-icon',
                href: '/safari-pinned-tab.svg',
                color: '#ff438a'
            },
            {
                name: 'apple-mobile-web-app-title',
                content: 'La Capsule'
            },
            {
                name: 'application-name',
                content: 'La Capsule'
            },
            {
                name: 'msapplication-TileColor',
                content: '#ffffff'
            },
            {
                name: 'theme-color',
                content: '#ffffff'
            }
        ]
    },

    /*
  ** Customize the progress-bar color
  */
    loading: false,

    /*
  ** Global CSS
  */
    css: [],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: ['@/assets/scss/main.scss', '~/plugins/globals.js'],

    /*
  ** Nuxt.js modules
  */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios',
        ['nuxt-sass-resources-loader', ['~/assets/scss/abstracts/_functions.scss', '~/assets/scss/abstracts/_mixins.scss', '~/assets/scss/abstracts/_placeholders.scss', '~/assets/scss/abstracts/_variables.scss']],
        [
            '@nuxtjs/google-analytics',
            {
                id: 'UA-133182494-1'
            }
        ]
    ],
    /*
  ** Axios module configuration
  */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.AXIOS_BASE_URL || 'http://localhost:3000'
    },

    /*
  ** Server Middleware
  */
    serverMiddleware: ['~/api/form.js'],

    /*
  ** Build configuration
  */
    build: {
        /*
    ** You can extend webpack config here
    */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        fix: true
                    }
                });
            }
        }
    }
};
