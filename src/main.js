import Vue from 'vue';
import App from './App.vue';
import router from './router';
// eslint-disable-next-line import/extensions
import store from './vuex/store.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
