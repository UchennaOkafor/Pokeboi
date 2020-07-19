<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-7 col-md-10">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Type to begin search...">
        </div>
      </div>
      <div class="col-5 col-md-2">
        <a class="btn btn-block btn-primary text-white mb-2">Compare</a>
      </div>
    </div>
    <div class="row">
      <template v-for="i in 24">
        <div class="col-6 col-md-4 col-lg-3 col-xl-2 px-3 py-3" :key="i">
          <poke-card :id="i"></poke-card>
        </div>
      </template>
    </div>

    <div class="row justify-content-center">
      <nav class="mb-3">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PokeCard from '@/components/PokeCard.vue'
import * as util from '../utils.js';

export default {
  name: 'Home',
  components: {
    PokeCard
  },
  data() {
    return {
      pagination: {
        itemPerPage: 25,
        currentPage: 1,
        totalPages: 0,
        hasMore: false
      }
    }
  },
  async beforeMount() {
    console.log(this.$route.query.page);
    if (! util.isPokedexInitialized()) {
      await util.initializePokedex();
    }
  },
  mounted() {
    // const count = 964;
    // this.pagination.maxPages = parseInt(count / 25);
  }
}
</script>
