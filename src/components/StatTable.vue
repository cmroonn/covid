<template>
  <div class="stat-table" id="table">

    <div class="d-flex stat-table__info">
      <p>
        Data for <span>{{ currentDate }}</span>
      </p>
    </div>

<!--    <date-picker-->
<!--      value="range"-->
<!--      :min-date="new Date(2020, 0, 1)"-->
<!--      :max-date="new Date()"-->
<!--      is-range-->
<!--      v-model="datePeriod"-->
<!--    >-->
<!--      <template v-slot="{ inputValue, inputEvents }">-->
<!--        <div class="d-flex justify-center items-center">-->
<!--          <input-->
<!--            :value="inputValue.start"-->
<!--            v-on="inputEvents.start"-->
<!--            class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"-->
<!--            readonly-->
<!--          />-->
<!--          <svg-->
<!--            width="20"-->
<!--            height="20"-->
<!--            fill="none"-->
<!--            viewBox="0 0 24 24"-->
<!--            stroke="currentColor"-->
<!--          >-->
<!--            <path-->
<!--              stroke-linecap="round"-->
<!--              stroke-linejoin="round"-->
<!--              stroke-width="2"-->
<!--              d="M14 5l7 7m0 0l-7 7m7-7H3"-->
<!--            />-->
<!--          </svg>-->
<!--          <input-->
<!--            :value="inputValue.end"-->
<!--            v-on="inputEvents.end"-->
<!--            class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"-->
<!--            readonly-->
<!--          />-->
<!--        </div>-->
<!--      </template>-->
<!--    </date-picker>-->

    <div class="stat-table__row stat-table__header">
      <p @click="sortByCountry">
        Country
      </p>

      <p @click="sortByConfirmed">
        Confirmed
      </p>

      <p @click="sortByDeaths">
        Deaths
      </p>

      <p @click="sortByRecovered">
        Recovered
      </p>
    </div>

    <div class="stat-table__body">
      <div class="stat-table__row" v-for="(row, i) in showPerPage" :key="i">
        <p>
          {{ row.Country }}
        </p>

        <p>
          {{ row.NewConfirmed }}
        </p>

        <p>
          {{ row.NewDeaths }}
        </p>

        <p>
          {{ row.NewRecovered }}
        </p>
      </div>
    </div>

    <div class="stat-table__pagination">
      <button type="button" class="stat-table__pagination__page"
         v-for="page in tablePages"
         :key="page"
         @click="changePage(page)"
         :class="{active : page === currentPage}" >
        {{ page }}
      </button>
    </div>

    <div class="stat-table__per-page">
      Показывать по:

      <button type="button" @click="changePerPage(10)">
        10
      </button>

      <button type="button" @click="changePerPage(20)">
        20
      </button>

      <button type="button" @click="changePerPage(30)">
        30
      </button>
    </div>
  </div>
</template>

<script>

// import datePicker from 'v-calendar/lib/components/date-picker.umd';
export default {
  name: 'StatTable',
  props: {
    covidDataCountries: {
      type: Array,
      default: () => [],
    },
    covidDataDate: String,
  },

  data() {
    return {
      perPage: 10,
      currentPage: 1,
      increaseCountry: true,
      increaseConfirmed: false,
      increaseDeaths: true,
      increaseRecovered: true,
      datePeriod: null,
    };
  },

  computed: {
    tablePages() {
      return Math.ceil(this.covidDataCountries.length / this.perPage);
    },

    showPerPage() {
      const from = (this.currentPage - 1) * this.perPage;
      const to = from + this.perPage;
      return this.covidDataCountries.slice(from, to);
    },

    currentDate() {
      const date = new Date(this.covidDataDate);
      return date.toLocaleDateString('ru-RU');
    },

  },

  methods: {
    changePage(page) {
      this.currentPage = page;
    },

    sortByCountry() {
      if (this.increaseCountry) {
        this.covidDataCountries.sort((a, b) => a.Country.localeCompare(b.Country));
      } else {
        this.covidDataCountries.sort((a, b) => b.Country.localeCompare(a.Country));
      }

      this.increaseCountry = !this.increaseCountry;
      this.increaseConfirmed = true;
      this.increaseDeaths = true;
      this.increaseRecovered = true;
    },

    sortByConfirmed() {
      if (this.increaseConfirmed) {
        this.covidDataCountries.sort((a, b) => b.NewConfirmed - a.NewConfirmed);
      } else {
        this.covidDataCountries.sort((a, b) => a.NewConfirmed - b.NewConfirmed);
      }

      this.increaseConfirmed = !this.increaseConfirmed;
      this.increaseCountry = true;
      this.increaseDeaths = true;
      this.increaseRecovered = true;
    },

    sortByDeaths() {
      if (this.increaseDeaths) {
        this.covidDataCountries.sort((a, b) => b.NewDeaths - a.NewDeaths);
      } else {
        this.covidDataCountries.sort((a, b) => a.NewDeaths - b.NewDeaths);
      }

      this.increaseDeaths = !this.increaseDeaths;
      this.increaseConfirmed = true;
      this.increaseCountry = true;
      this.increaseRecovered = true;
    },

    sortByRecovered() {
      if (this.increaseRecovered) {
        this.covidDataCountries.sort((a, b) => b.NewRecovered - a.NewRecovered);
      } else {
        this.covidDataCountries.sort((a, b) => a.NewRecovered - b.NewRecovered);
      }

      this.increaseRecovered = !this.increaseRecovered;
      this.increaseConfirmed = true;
      this.increaseDeaths = true;
      this.increaseCountry = true;
    },

    changePerPage(num) {
      this.perPage = num;
      this.currentPage = 1;
      setTimeout(() => document.querySelector('#table').scrollIntoView({ block: 'start', behavior: 'smooth' }), 50);
    },
  },

  watch: {
    datePeriod(newVal) {
      this.$emit('getDatePeriod', newVal);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .stat-table {
    width: 100%;
    margin: 80px 0 30px;
  }

  .stat-table__header {
    position: sticky;
    top: 0;
    background: #333;
    p {
      cursor: pointer;
      border: 1px solid whitesmoke;
      padding: 5px 0;
    }
  }

  .stat-table__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 10px;

    &:not(.stat-table__header) {
      &:hover {
        background: rgba(255, 255, 255, .25);
        transition: .2s;
      }
    }
  }

  .stat-table__pagination {
    display: flex;
    justify-content: center;
    column-gap: 5px;
    margin: 20px 0;
    button {
      font-size: .9em;
      border:  none;
      border-bottom: 1px solid #eee;
      display:  flex;
      padding: 5px;
      cursor: pointer;
      background: none;
      color: white;
      outline: none;
      &:hover {
        background: #eee;
        color: #333;
      }

      &.active {
        font-weight: 700;
        color: #29bb24;

        &:hover {
          background: inherit;
          color: #29bb24;
        }
      }
    }
  }

  .stat-table__info {
    p {
      text-align: left;

      span {
        font-weight: 700;
      }
    }
  }

  .stat-table__per-page {
    text-align: left;
    margin: 20px 0;
    font-size: 14px;
  }
</style>
