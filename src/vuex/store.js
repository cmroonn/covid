import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    apiData: [],
    countriesSlugs: [],
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

    getPeriodApiData({ commit, state }, period) {
      state.apiData = [];
      state.countriesSlugs.forEach((slug) => {
        setTimeout(() => {
          axios(`https://api.covid19api.com/country/${slug}?from=${period.start.toISOString()}&to=${period.end.toISOString()}`, {
            method: 'GET',
          })
            .then((response) => {
              commit('updateApiData', response.data);
            })
            .catch((err) => console.log(err));
        }, 10000);
      });
    },
  },
  mutations: {
    setApiData: (state, apiData) => {
      // sort countries by confirmed default
      apiData.Countries.sort((a, b) => b.NewConfirmed - a.NewConfirmed);
      // add array of country slugs
      apiData.Countries.forEach((country) => {
        state.countriesSlugs.push(country.Slug);
      });

      state.apiData = apiData;
    },

    updateApiData: (state, apiData) => {
      state.apiData.push(apiData);
      console.log(state.apiData);
    },
  },
  getters: {
    apiData(state) {
      return state.apiData;
    },

    countriesSlugs(state) {
      return state.countriesSlugs;
    },
  },
});

export default store;
