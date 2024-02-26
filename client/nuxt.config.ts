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
        srcDir: 'service-worker',
        filename: 'sw.ts',
        registerType: 'autoUpdate',
        manifest: {
            name: "DUET: food, comfort, TV",
            description: "Парный дневник для пар",
            short_name: "DUET",
            start_url: "/",
            lang: "ru",
            theme_color: "#0f172a",
            display: "standalone",
            background_color: "#0f172a",
            orientation: "portrait",
            icons: [
                {
                    src: 'image/192x192px.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'image/256x256px.png',
                    sizes: '256x256',
                    type: 'image/png'
                },
                {
                    src: 'image/384x384px.png',
                    sizes: '384x384',
                    type: 'image/png'
                },
                {
                    src: 'image/512x512px.png',
                    sizes: '512x512',
                    type: 'image/png'
                },
            ],
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
