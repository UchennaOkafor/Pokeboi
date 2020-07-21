<template>
  <div class="container-fluid">
    <template v-if="initialized">
      <div class="row">
        <div class="col-7 col-md-10">
          <form id="searchForm" @submit="formSubmit">
            <div class="form-group">
              <input ref="query" type="text" name="q" class="form-control" 
              placeholder="Search Pokémon by name..." :value="this.query">
              <input type="hidden" name="page" value="1">
            </div>
          </form>
        </div>
        <div class="col-5 col-md-2">
          <button form="searchForm" type="submit" class="btn btn-block btn-primary text-white mb-2">Search</button>
        </div>
      </div>
      <div class="row">
        <template v-if="searchResults.length > 0">
          <template v-for="pokemon in searchResults">
            <div class="col-6 col-md-4 col-lg-3 col-xl-2 px-3 py-3" :key="pokemon.name">
              <poke-card :url="pokemon.url"></poke-card>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="col-12 px-3 py-3">
              <p class="text-center">
                No Pokémon found with the name 
                <span class="font-weight-bold">{{ this.query }}</span>
                , please refine your search.
              </p>
          </div>
        </template>
      </div>
      <div v-if="searchResults.length > 0" class="row justify-content-center">
        <pagination :data="pagination" :query="query"></pagination>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-12">
          <p class="text-center lead">Please wait, initializing Pokédex...</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import PokeCard from '@/components/PokeCard.vue'
import Pagination from '@/components/Pagination.vue'

import * as util from '../utils.js';

export default {
  name: 'Home',
  components: {
    PokeCard, Pagination
  },
  data() {
    return {
      query: "",
      searchResults: [],
      pagination: {},
      initialized: false
    }
  },
  async beforeMount() {
    if (! util.isPokedexInitialized()) {
      await util.initializePokedex();
    }

    this.initialized = true;
    this.query = this.$route.query.q || "";
    this.search(this.query, this.$route.query.page || 1);
  },
  methods: {
    search(query, page) {
      let response = util.searchPokedex(query, 24, page);
      this.searchResults = response.results;
      this.pagination = response.pagination;
    },
    formSubmit(e) {
      e.preventDefault();

      this.query = this.$refs.query.value;
      window.history.replaceState(null, null, `?q=${this.query}&page=1`);
      this.search(this.query, 1);
    }
  }
}
</script>