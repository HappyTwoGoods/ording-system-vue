import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index/Home'
import MyOrding from '@/page/index/MyOrding'
import My from '@/page/index/My'
import Index from '@/components/Index'

Vue.use(Router)

Router.prototype.togo = function (path) {
  this.isleft = true;
  this.isright = false;
  this.push(path)
};
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true;
  this.isleft = false;
  this.push(path)
};
Router.prototype.goLeft = function (path, query) {
  this.isright = false;
  this.isleft = true;
  this.push(path, query)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true;
  this.isleft = false;
  this.go(-1)
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'Home',
      children: [
        {
          path: '/Home',
          name: 'Home',
          component: Home
        },
        {
          path: "/MyOrding",
          name: 'MyOrding',
          component: MyOrding
        },
        {
          path: "/My",
          name: 'My',
          component: My
        }
      ]
    },
    // {
    //   path: '/Home',
    //   name: 'Home',
    //   component: Home,
    //   meta: {
    //     title: '首页'
    //   }
    // },
    // {
    //   path: "/MyOrding",
    //   name: 'MyOrding',
    //   component: MyOrding
    // }
  ]
})
