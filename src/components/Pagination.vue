<template>
<div>
  <span class="font-weight-bold text-dark d-flex justify-content-center mb-2">{{data.currentPage}}/{{ data.totalPages }}</span>
  <nav class="mb-5">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled' : previousPageDisabled}">
        <a class="page-link" :href="getLink(data.currentPage - 1)">
          <span aria-hidden="true">Prev</span>
        </a>
      </li>

      <li class="page-item" :class="{'disabled' : nextPageDisabled}">
        <a class="page-link" :href="getLink(data.currentPage + 1)">
          <span aria-hidden="true">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    data: Object,
    query: String
  },
  data() {
    return {
    }
  },
  methods: {
    getLink(i) {
      if (i <= 0) {
        i = 1;
      }

      if (i >= this.data.totalPages) {
        i = this.data.totalPages;
      }

      return `/?q=${this.query}&page=${i}`;
    }
  },
  computed: {
    previousPageDisabled() {
      return this.data.currentPage === 1;
    },
    nextPageDisabled() {
      return this.data.totalPages === this.data.currentPage
    }
  }
}

</script>

<style scoped>

</style>