
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: '',
        component: () => import('pages/Home.vue')
      },

      //adm
      { path: '/admin',
        component: () => import('pages/admin/Home.vue')
      },
      { path: '/admin/home',
        component: () => import('pages/admin/Home.vue')
      },
      { path: '/admin/clientsList',
        component: () => import('pages/admin/ClientsList.vue')
      },
      { path: '/admin/clientDetail',
        component: () => import('pages/admin/ClientDetail.vue')
      },
      { path: '/admin/newClient',
        component: () => import('pages/admin/NewClient.vue')
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
