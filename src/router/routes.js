const routes = [{
        path: '/',
        component: () =>
            import ('layouts/LoginLayout.vue'),
        children: [{
                path: '/',
                component: () =>
                    import ('pages/LoginPage.vue')
            },
            {
                path: '/signup',
                component: () =>
                    import ('pages/SignupPage.vue')
            }
        ]
    },
    {
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '/stat',
                component: () =>
                    import ('pages/Statistics.vue')
            },
            {
                path: '/mestablishment',
                component: () =>
                    import ('pages/MonitorEstablishment.vue')
            },
            {
                path: '/mschool',
                component: () =>
                    import ('pages/MonitorSchool.vue')
            },
            {
                path: '/high-risk',
                component: () =>
                    import ('pages/HighRisk.vue')
            },
        ]
    }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    })
}

export default routes