import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: 'dark',
            themes: {
                dark: {
                    colors: {
                        primary: '#1976D2',
                        secondary: '#424242',
                        accent: '#82B1FF',
                        error: '#FF5252',
                        info: '#2196F3',
                        success: '#4CAF50',
                        warning: '#FFC107',
                    },
                },
            },
        },
        icons: {
            defaultSet: 'mdi',
        },
        // defaults: {
        //     VBtn: {
        //         color: 'primary',
        //         variant: 'flat',
        //     },
        //     VTextField: {
        //         variant: 'outlined',
        //     },
        // },
    })
    app.vueApp.use(vuetify)
})