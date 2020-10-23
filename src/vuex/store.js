import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state: {
    apiData: [],
  },
  actions: {
    getApiData({ commit }) {
      return axios('https://api.covid19api.com/summary', {
        method: 'GET',
      })
        .then((response) => {
          commit('setApiData', response.data);
        });
    },
  },
  mutations: {
    setApiData: (state, apiData) => {
      state.apiData = apiData;
    },
  },
  getters: {
    apiData(state) {
      return state.apiData;
    },
  },
});

export default store;
