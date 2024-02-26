import {resolve} from 'path';

const packageJSON = require('./package.json');

const env = {
    serverOrigin: process.env.SERVER_ORIGIN ?? 'SERVER_ORIGIN',
    mode: process.env.MODE ?? 'MODE',
    vkAppId: process.env.VK_APP_ID ?? 'VK_APP_ID',
};

console.log(env);

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
            title: 'DUET',
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
            lifetime: 43200,
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
            getMe: {path: 'profiles/me', method: 'GET'},
            refreshToken: {path: 'auth/refresh', method: 'POST'},
        },
        pages: {
            auth: '/auth',
            protectAllPages: true
        }
    },

    pwa: {
        strategies: 'generateSW',
        registerType: 'autoUpdate',
        manifestFilename: './manifest.webmanifest',
        registerWebManifestInRouteRules: true,
        client: {
            installPrompt: true,
            periodicSyncForUpdates: 20
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}']
        },
        injectManifest: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}']
        },
        devOptions: {
            enabled: true,
            suppressWarnings: true,
            navigateFallback: '/',
            navigateFallbackAllowlist: [/^\/$/],
            type: 'module',
        }
    },

    modules: [
        '~/modules/nuxt-local-auth/module',
        '@vite-pwa/nuxt'
    ],

    devtools: {enabled: true}
})
