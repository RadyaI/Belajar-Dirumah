import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import student from '../views/student/student.vue'
import teacher from '../views/teacher/teacher.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/student',
    component: student
  },
  {
    path: '/teacher',
    component: teacher
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
