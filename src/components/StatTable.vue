<template>
  <div class="stat-table">

    <div class="stat-table__info">
      <p>
        Data for <span>{{ currentDate }}</span>
      </p>
    </div>

    <div class="stat-table__row stat-table__header">
      <p>
        Country
      </p>

      <p>
        Confirmed
      </p>

      <p>
        Deaths
      </p>

      <p>
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
      <p class="stat-table__pagination__page"
         v-for="page in tablePages"
         :key="page"
         @click="changePage(page)"
         :class="{active : page === currentPage}" >
        {{ page }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatTable',

  props: {
    covidDataCountries: {
      type: Array,
      default: () => [],
    },
    covidDataDate: Date,
  },

  data() {
    return {
      perPage: 10,
      currentPage: 1,
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
      return date.toLocaleDateString('en-US');
    },

  },

  methods: {
    changePage(page) {
      this.currentPage = page;
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
    p {
      font-size: .9em;
      border-bottom: 1px solid #eee;
      display:  flex;
      padding: 5px;
      cursor: pointer;

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
</style>
