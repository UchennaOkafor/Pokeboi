<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h5 class="mb-0 mt-2">A list of all your favourite pokemon</h5>
        </div>
        <div class="col-auto">
          <button class="btn btn-primary text-white" @click="clearFavourites">Clear favourites</button>
        </div>
      </div>
      <div class="row">
        <template v-if="favouritedPokemons.length > 0">
          <template v-for="(id, i) in favouritedPokemons">
            <div class="col-6 col-md-4 col-lg-3 col-xl-2 px-3 py-3" :key="i">
              <poke-card :id="id"></poke-card>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="mt-5 col-12 mx-auto">
            <h4 class="font-weight-normal text-center">
              Feels empty here, why don't you <a href="/">favourite</a> some pokemons? 
            </h4>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from "../utils.js";
import PokeCard from '@/components/PokeCard.vue'

export default {
  name: 'Favourites',
  components: { PokeCard },
  data() {
    return {
      favouritedPokemons: [],
    }
  },
  beforeMount() {
    this.favouritedPokemons = util.getFavoritedPokemons();
  },
  methods: {
    clearFavourites() {
      this.favouritedPokemons = [];
      util.clearFavoritedPokemons();
    }
  }
}
</script>

<style scoped>

</style>