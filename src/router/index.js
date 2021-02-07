import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Shop from '../views/Shop.vue'

const routes = [
  {
    path: '/:search?',
    name: 'shop',
    component: Shop,
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/product/:productId?',
    name: 'product',
    component: () => import('../views/Product.vue'),
    props: true,
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/admins/:products?',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },

  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
