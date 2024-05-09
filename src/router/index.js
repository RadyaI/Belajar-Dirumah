import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import forbidden from '../views/forbidden.vue'

import student from '../views/student/student.vue'


import teacher from '../views/teacher/teacher.vue'
import teacherMateriView from '../views/teacher/viewMateri.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/forbidden',
    component: forbidden
  },
  {
    path: '/student',
    component: student
  },
  {
    path: '/teacher',
    component: teacher
  },
  {
    path: '/teacher/materi/:id',
    component: teacherMateriView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true"
  if ((to.path.startsWith('/teacher') || to.path.startsWith('/student')) && !isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
