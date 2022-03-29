import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'

export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  {
    path: '/join-data',
    meta: { title: 'D3' },
    component: () => import('./views/d3/chart/join-data.vue')
  },
  {
    path: '/bar',
    meta: { title: 'D3' },
    component: () => import('./views/d3/chart/bar.vue')
  },
  { path: '/:path(.*)', component: NotFound },
]
