<template>
  <div>
    <div v-if="initialized" class="card" >
      <img :src="getPictureUrl(id)" class="card-img-top w-50 h-auto mx-auto pt-2" alt="Pokemon">
      <div class="card-body">
        <h5 class="card-title">{{ pokemon.name }}</h5>
        <p class="card-text text-left">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </p>
        <a href="#" class="btn btn-sm btn-primary">Ayy boi</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokeCard',
  props: {
    id: Number
  },
  data() {
    return {
      initialized: false,
      pokemon: null
    }
  },
  async beforeMount() {
    this.pokemon = await this.getPokemonDetails(this.id);
    this.initialized = true;
  },
  methods: {
    getPictureUrl(id) {
      return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    },
    async getPokemonDetails(id) {
      let apiEndpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;
      let response = await fetch(apiEndpoint);
      let pokemonData = await response.json();

      if (pokemonData.name != null) {
        pokemonData.name = pokemonData.name.capitalize();
      }

      return pokemonData;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>