<template>
  <div>
    <div v-if="initialized" class="card" >
      <img :src="getPokemonPicture(id)" class="card-img-top w-25 mx-auto pt-3" alt="Pokemon">
      <div class="card-body">
        <h5 class="card-title">{{ pokemon.name.capitalize() }}</h5>
        <p class="card-text text-left">
          <ul class="list-unstyled">
            <li>
              <span class="font-weight-bold">Height:</span> 
              {{ pokemon.height * 10 }}cm
            </li>
            <li class="">
              <span class="font-weight-bold">Weight:</span> 
              {{ pokemon.weight / 10 }}kg
            </li>
            <li>
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
    this.pokemon = await this.getPokemonById(this.id);
    this.initialized = true;
  },
  methods: {
    getPokemonPicture(id) {
      return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    },
    async getPokemonById(id) {
      let apiEndpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;
      let response = await fetch(apiEndpoint);
      return await response.json();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>