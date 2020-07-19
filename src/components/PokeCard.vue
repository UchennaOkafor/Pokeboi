<template>
  <div>
    <div v-if="initialized" class="card">
      <div class="card-header py-0">
        <div class="clearfix">
          <button class="btn btn-sm btn-white float-right" @click="this.toggleFavourite">
            <template v-if="isFavourited">💖</template>
            <template v-else>🤍</template>
        </button>
        </div>
      </div>
      <img :src="getPokemonPicture()" class="card-img-top w-25 mx-auto pt-3" alt="Pokemon">
      <div class="card-body">
        <h6 class="card-title">{{ pokemon.name.capitalize() }}</h6>
        <p class="card-text text-left">
          <ul class="list-unstyled">
            <li class="h6">
              <span class="font-weight-bold">Height:</span> 
              {{ pokemon.height * 10 }}cm
            </li>
            <li class="h6">
              <span class="font-weight-bold">Weight:</span> 
              {{ pokemon.weight / 10 }}kg
            </li>
            <li class="h6">
              <span class="font-weight-bold">Types:</span> 
              <template v-for="(type, i) in pokemon.types">
                <span :key="i" class="badge badge-light mx-1">{{ type.type.name }}</span>
              </template>
            </li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from "../utils.js";

export default {
  name: 'PokeCard',
  props: {
    id: Number
  },
  data() {
    return {
      initialized: false,
      pokemon: null,
      isFavourited: false
    }
  },
  async beforeMount() {
    this.pokemon = await this.getPokemonById();
    this.isFavourited = util.isPokemonFavourited(this.id);
    this.initialized = true;
  },
  methods: {
    getPokemonPicture() {
      return `https://pokeres.bastionbot.org/images/pokemon/${this.id}.png`;
    },
    async getPokemonById() {
      let apiEndpoint = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
      let response = await fetch(apiEndpoint);
      return await response.json();
    },
    toggleFavourite() {
      util.toggleFavouritePokemon(this.id);
      this.isFavourited = util.isPokemonFavourited(this.id);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>