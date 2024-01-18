import {resolve} from 'path';

const packageJSON = require('./package.json');

const env = {
    serverOrigin: process.env.SERVER_ORIGIN ?? 'SERVER_ORIGIN',
    vkAppId: process.env.VK_APP_ID ?? 'VK_APP_ID',
};

export default defineNuxtConfig({
    ssr: false,

    runtimeConfig: {
        public: {
            versionApp: packageJSON.version,
            ...env
        }
    },

    app: {
        head: {
            link: [
                {
                    href: '/scripts/snowFlakes/snow.min.css',
                    rel: 'stylesheet',
                    tagPosition: 'head'
                }
            ],
            script: [
                {
                    src: '/scripts/snowFlakes/Snow.js',
                    tagPosition: 'bodyClose'
                },
                {
                    innerHTML: 'new Snow({' +
                        '   showSnowBalls: false,' +
                        '   showSnowBallsIsMobile: false' +
                        '})',
                    tagPosition: 'bodyClose'
                }
            ]
        }
    },

    css: [
        '~/assets/styles/main.scss',
        '~/assets/styles/themesBuilder.scss',
        '~/assets/styles/fonts.scss',
        '~/assets/styles/transitions.scss'
    ],

    alias: {
        '@colors': resolve(__dirname, './assets/styles/colors.scss')
    },

    localAuth: {
        origin: env.serverOrigin + '/api/',
        token: {
            path: 'accessToken',
            queryKey: 'accessToken'
        },
        refreshToken: {
            enabled: true,
            path: 'refreshToken',
            queryKey: 'refreshToken'
        },
        endpoints: {
            signIn: {path: 'auth/signIn', method: 'POST'},
            getMe: {path: 'users/me', method: 'GET'},
            refreshToken: {path: 'auth/refresh', method: 'POST'},
        },
        pages: {
            auth: '/auth',
            protectAllPages: true
        }
    },

    modules: [
        '~/modules/nuxt-local-auth/module'
    ],

    devtools: {enabled: true}
})
