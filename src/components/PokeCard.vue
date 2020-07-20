<template>
  <div>
    <div v-if="initialized" class="card">
      <div class="clearfix">
        <button class="btn btn-sm btn-white float-right p-0 mr-3 my-2" @click="this.toggleFavourite">
          <template v-if="isFavourited">💖</template>
          <template v-else>🤍</template>
        </button>
      </div>
      <img :src="pictureUrl" :data-fallback-src="imageFallbackSrc" 
        @error="handleImageError" class="card-img-top w-50 mx-auto pt-3" alt="Pokémon"/>
      <div class="card-body">
        <h5 class="card-title text-center">{{ pokemon.name.capitalize() }}</h5>
        <div class="row justify-content-center">
          <template v-for="(type, i) in pokemon.types">
            <span :key="i" class="badge badge-light mx-1 text-muted">{{ type.type.name.capitalize() }}</span>
          </template>
        </div>
      </div>
    </div>
    <div v-else class="card">
      <img class="card-img-top w-25 mx-auto"/>
      <div class="card-body">
        <h5 class="card-title text-center"></h5>
        <div class="row justify-content-center">
          <div class="spinner-border text-secondary mb-3" role="status">
            <span class="sr-only">Loading...</span>
          </div>
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
    url: String
  },
  data() {
    return {
      imageFallbackSrc: "https://drinkedin.net/components/com_easyblog/themes/wireframe/images/placeholder-image.png",
      uniqueId: Number,
      initialized: false,
      pokemon: Object,
      isFavourited: false
    }
  },
  created() {
    //This component can be initialized either by an Id or a Url

    //Checks if a url has been set, if it has, it parses the Id
    if (this.id == null && this.url != null) {
      let parts = this.url.split("/");
      this.uniqueId = parseInt(parts[parts.length -2]);
    }

    //If the user has set an Id, then use it
    if (this.id != null) {
      this.uniqueId = this.id;
    }
  },
  async beforeMount() {
    this.pokemon = await this.getPokemonById();
    this.isFavourited = util.isPokemonFavourited(this.uniqueId);
    this.initialized = true;
  },
  methods: {
    async getPokemonById() {
      let apiEndpoint = `https://pokeapi.co/api/v2/pokemon/${this.uniqueId}`;
      let response = await fetch(apiEndpoint);
      return await response.json();
    },
    toggleFavourite() {
      util.toggleFavouritePokemon(this.uniqueId);
      this.isFavourited = util.isPokemonFavourited(this.uniqueId);
      this.$emit("pokemon-favourited", this.uniqueId);
    },
    handleImageError(e) {
      let fallbackSrc = e.target.dataset.fallbackSrc;
      if (e.target.src != fallbackSrc) {
        e.target.src = fallbackSrc;
      }
    }
  },
  computed: {
    pictureUrl() {
      //The Id of the pokeapi.co skips by 9194 after 807, rather than being sequential
      //This uses a fallback for the broken images
      if (this.uniqueId <= 807) {
        return `https://pokeres.bastionbot.org/images/pokemon/${this.uniqueId}.png`;
      } else {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.uniqueId}.png`;
      }
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