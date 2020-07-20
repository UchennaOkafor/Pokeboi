<template>
  <div>
    <div v-if="initialized" class="card">
      <div class="clearfix">
        <button class="btn btn-sm btn-white float-right p-0 mr-3 my-2" @click="this.toggleFavourite">
          <template v-if="isFavourited">💖</template>
          <template v-else>🤍</template>
        </button>
      </div>
      <poke-image :id="pokemon.id" classes="card-img-top w-50 mx-auto pt-3 cursor-pointer" @clicked="this.openModal"></poke-image>
      <div class="card-body">
        <h5 class="card-title cursor-pointer text-center">
          <a data-toggle="modal" :data-target="`#pokeModal-${pokemon.name}`">{{ pokemon.name.capitalize() }}</a>
        </h5>
        <div class="row justify-content-center">
          <template v-for="(type, i) in pokemon.types">
            <span :key="i" class="badge badge-light mx-1 text-muted">{{ type.type.name.capitalize() }}</span>
          </template>
        </div>
      </div>
      <poke-modal :pokemon="pokemon"></poke-modal>
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
import * as $ from "jquery";
import * as util from "../utils.js";
import PokeImage from './PokeImage.vue'
import PokeModal from './PokeModal.vue'

export default {
  name: 'PokeCard',
  props: {
    id: Number,
    url: String
  },
  components: { PokeModal, PokeImage },
  data() {
    return {
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
    openModal() {
      $(`#pokeModal-${this.pokemon.name}`).modal("show");
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