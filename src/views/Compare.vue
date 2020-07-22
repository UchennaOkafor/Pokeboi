<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h6>Select up to two Pokémons to compare</h6>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form>
          <div class="form-row align-items-center">
            <div class="col-auto my-1">
              <select ref="pokemonSelect1" @change="pokemonSelected" class="custom-select mr-sm-2">
                <option selected>Select Pokémon</option>
                <option v-for="(pokemon, i) in pokedex" :key="i" :value="pokemon.url">{{pokemon.name.capitalize()}}</option>
              </select>
            </div>
            <div class="col-auto my-1">
              <span class="h5">vs</span>
            </div>
            <div class="col-auto my-1">
              <select ref="pokemonSelect2" @change="pokemonSelected" class="custom-select mr-sm-2">
                <option selected>Select Pokémon</option>
                <option v-for="(pokemon, i) in pokedex" :key="i" :value="pokemon.url">{{pokemon.name.capitalize()}}</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        
      </div>
    </div>
  </div>
</template>

<script>
import * as util from "../utils.js";

export default {
  name: 'Compare',
  components: {

  },
  data() {
    return {
      pokedex: null,
    }
  },
  beforeMount() {
    this.pokedex = util.getPokedex().sort((a, b) => a.name > b.name ? 1 : -1);
  },
  methods: {
    pokemonSelected() {
      let selectedIndex1 = this.$refs.pokemonSelect1.selectedIndex;
      let selectedIndex2 = this.$refs.pokemonSelect2.selectedIndex;

      if (selectedIndex1 > 0 && selectedIndex2 > 0 && selectedIndex1 !== selectedIndex2) {
        let selectedValue1 = this.$refs.pokemonSelect1.options[selectedIndex1].value;
        let selectedValue2 = this.$refs.pokemonSelect2.options[selectedIndex2].value;

        console.log(selectedValue1);
        console.log(selectedValue2);
      }
    }
  }
}
</script>