import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import authService from '../services/authService';

import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Students from '../views/Students.vue';
import Register from '../views/Register.vue';
import AdicionarEstudanteView from '../views/AdicionarEstudanteView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/registro',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/students',
    name: 'Students',
    component: Students,
    meta: { requiresAuth: true },
  },
  {
    path: '/studants/add',
    name: 'AdicionarEstudante',
    component: AdicionarEstudanteView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/registro') && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
