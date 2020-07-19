<template>
  <div>
    <div v-if="initialized" class="card">
      <div class="clearfix">
        <button class="btn btn-sm btn-white float-right p-0 mr-3 my-2" @click="this.toggleFavourite">
          <template v-if="isFavourited">💖</template>
          <template v-else>🤍</template>
        </button>
      </div>
      <img :src="pokemonUrl" class="card-img-top w-50 mx-auto pt-3" alt="Pokemon">
      <div class="card-body">
        <h5 class="card-title text-center">{{ pokemon.name.capitalize() }}</h5>
        <div class="row justify-content-center">
          <template v-for="(type, i) in pokemon.types">
            <span :key="i" class="badge badge-light mx-1 text-muted">{{ type.type.name.capitalize() }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from "../utils.js";

export default {
  name: 'PokeCard',
  props: {
    id: Number,
    name: String
  },
  data() {
    return {
      initialized: false,
      pokemon: null,
      isFavourited: false
    }
  },
  created() {
    if (this.id == null && this.url != null) {
      let parts = this.url.split("/");
      this.id = parseInt(parts[parts.length -1]);
    }
  },
  async beforeMount() {
    this.pokemon = await this.getPokemonById();
    this.isFavourited = util.isPokemonFavourited(this.id);
    this.initialized = true;
  },
  methods: {
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
  computed: {
    pokemonUrl() {
      return `https://pokeres.bastionbot.org/images/pokemon/${this.id}.png`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background: #fff;
  border-color: #edf2f9;
  margin-bottom: 0.95rem !important;
  box-shadow: 0 1px 3px rgba(171, 171, 171, 0.12), 0 1px 2px rgba(171, 171, 171, 0.24);
}
</style>