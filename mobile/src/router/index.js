import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'pages/home'
import Category from 'pages/category'
import Cart from 'pages/cart'
import User from 'pages/user'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL,
})

export default router