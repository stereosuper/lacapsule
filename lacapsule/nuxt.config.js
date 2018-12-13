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
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
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
            }
        ]
    },

    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */
    css: [],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: ['@/assets/scss/main.scss'],

    /*
  ** Nuxt.js modules
  */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios',
        ['nuxt-sass-resources-loader', ['~/assets/scss/abstracts/_functions.scss', '~/assets/scss/abstracts/_mixins.scss', '~/assets/scss/abstracts/_placeholders.scss', '~/assets/scss/abstracts/_variables.scss']]
    ],
    /*
  ** Axios module configuration
  */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

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
