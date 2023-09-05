
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: '',
        component: () => import('pages/Home.vue')
      },

      //adm
      { path: '/adm',
        component: () => import('pages/adm/ClientsList.vue')
      },
      { path: '/adm/clientsList',
        component: () => import('pages/adm/ClientsList.vue')
      },
      { path: '/adm/clientDetail',
        component: () => import('pages/adm/ClientDetail.vue')
      },
      { path: '/adm/newClient',
        component: () => import('pages/adm/NewClient.vue')
      },
      //finance
      { path: '/finance',
        component: () => import('pages/finance/SuppliersList.vue')
      },
      { path: '/finance/newSupplier',
        component: () => import('pages/finance/NewSupplier.vue')
      },
      { path: '/finance/suppliersList',
        component: () => import('pages/finance/SuppliersList.vue')
      },
      // reports
      { path: '/reports',
        component: () => import('pages/reports/ReportsList.vue')
      },
      { path: '/reports/reportsList',
        component: () => import('pages/reports/ReportsList.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
