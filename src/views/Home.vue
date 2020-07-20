<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-7 col-md-10">
        <form id="searchForm">
          <div class="form-group">
            <input type="text" name="q" class="form-control" 
            placeholder="Search Pokémon by name..." :value="this.query">
          </div>
        </form>
      </div>
      <div class="col-5 col-md-2">
        <button form="searchForm" type="submit" class="btn btn-block btn-primary text-white mb-2">Search</button>
      </div>
    </div>
    <div class="row">
      <template v-for="(pokemon, i) in searchResults">
        <div class="col-6 col-md-4 col-lg-3 col-xl-2 px-3 py-3" :key="i">
          <poke-card :url="pokemon.url"></poke-card>
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
      query: String,
      searchResults: [],
      pagination: {
        itemPerPage: 24,
        currentPage: 1,
        hasMore: false
      }
    }
  },
  created() {
    this.pagination.currentPage = this.$route.query.page || 1;
    this.query = this.$route.query.q || "";
  },
  async beforeMount() {
    if (! util.isPokedexInitialized()) {
      await util.initializePokedex();
    }
    this.searchResults = util.searchPokedex(this.query, this.pagination.itemPerPage, this.pagination.currentPage);
  }
}
</script>
