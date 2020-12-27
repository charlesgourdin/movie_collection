import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from '../store';

import Home from '../src/components/Home.vue';
import MoviesList from '../src/components/MoviesList.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/movies/:category', component: MoviesList },
  { path: '/tv/:category', component: MoviesList },
  { path: '/search', component: MoviesList }
];

const router = new VueRouter({
  routes
})

Vue.use(VueRouter);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
