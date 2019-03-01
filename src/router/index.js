import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
  ]
})
