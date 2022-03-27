import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'

export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  {
    path: '/d3',
    meta: { title: 'D3' },
    component: () => import('./views/d3/chart/Index.vue')
  },
  { path: '/:path(.*)', component: NotFound },
]
