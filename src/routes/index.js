import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/homeView.vue'
import BookshelfView from '../views/bookShelfView.vue'
import ContactUsView from '@/views/contactUsView.vue'
import SearchView from '../views/searchView.vue'
import NotFoundView from '../views/notFoundView.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: BookshelfView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactUsView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 
      }
    }
    return { top: 0 } 
  }
})

export default router