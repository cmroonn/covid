<template>
  <div class="home">
    <StatTable
      :covidDataCountries = "apiData.Countries"
      :covidDataDate = "apiData.Date"
      @getDatePeriod="ss"
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
      'countriesSlugs',
    ]),

  },

  methods: {
    ...mapActions([
      'getApiData',
      'getPeriodApiData',
    ]),

    ss(period) {
      this.getPeriodApiData(period);
    },
  },

  mounted() {
    this.getApiData();
  },
};
</script>
