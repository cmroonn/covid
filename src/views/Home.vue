<template>
  <div class="home">
    <img alt="Virus logo" src="../assets/logo.svg">
    <StatTable
      :covidDataCountries = "apiData.Countries"
      :covidDataDate = "apiData.Date"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import StatTable from '@/components/StatTable.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    StatTable,
  },

  computed: {
    ...mapGetters([
      'apiData',
    ]),
  },

  methods: {
    ...mapActions([
      'getApiData',
    ]),
  },

  mounted() {
    this.getApiData();
  },
};
</script>
