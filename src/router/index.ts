import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios'
import WelcomePage from '@/views/WelcomePage.vue';
import UserPage from '@/views/UserPage.vue';

const checkAuth = async () => {
  
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;

    const response = await axios.get('https://dist.nd.ru/api/auth', {
      headers: { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}` 
      }
    });

    console.log("Авторизация пройдена", response.data);
    localStorage.setItem('email', response.data.email);
    return true;
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    return false;
  }
};

const routes = [
  { 
    path: '/', 
    component: WelcomePage,
  },
  { 
    path: '/my-notes', 
    component: UserPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await checkAuth();

  if (to.path === '/' && isAuthenticated) {
    sessionStorage.getItem('email');
    return next('/my-notes');
  }

  if (to.path === '/my-notes' && !isAuthenticated) {
    sessionStorage.setItem('alertMessage', 'Вы должны авторизоваться!');
    return next('/');
  }

  next();
});
export default router;