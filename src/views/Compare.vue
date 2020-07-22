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
                <option v-for="(pokemon, i) in pokedex" :key="i" :value="pokemon.name">{{ pokemon.name.capitalize() }}</option>
              </select>
            </div>
            <div class="col-auto my-1">
              <span class="h5">vs</span>
            </div>
            <div class="col-auto my-1">
              <select ref="pokemonSelect2" @change="pokemonSelected" class="custom-select mr-sm-2">
                <option selected>Select Pokémon</option>
                <option v-for="(pokemon, i) in pokedex" :key="i" :value="pokemon.name">{{pokemon.name.capitalize()}}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="mt-4">
          <h6 class="lead mt-n2" v-if="loading">Please wait, loading...</h6>
          <table class="table" v-if="selectedPokemons.length > 0">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Base XP</th>
                <th scope="col">Weight</th>
                <th scope="col">Height</th>
                <th scope="col">Types</th>
                <th scope="col">Items Held</th>
                <th>HP</th>
                <th>Attack</th>
                <th>Defense</th>
                <th>Sp. Atk</th>
                <th>Sp. Def</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pokemon, i) in selectedPokemons" :key="i">
                <th scope="row">
                  <div>
                    <poke-image :id="pokemon.id" :height="50" classes="rounded-circle mx-1"></poke-image>
                    {{ pokemon.name.capitalize() }}
                  </div>
                </th>
                <td>{{ pokemon.base_experience }}</td>
                <td>{{ pokemon.weight / 10  }} kg</td>
                <td>{{ pokemon.height * 10 }} cm</td>
                <td>
                  <template v-for="(type, i) in pokemon.types">
                    <span :key="i" class="badge badge-secondary mx-1">{{ type.type.name.capitalize() }}</span>
                  </template>
                </td>
                <td>
                  <template v-for="(item, i) in pokemon.held_items">
                    <img :key="i" alt="Held item" class="mx-2" :title="item.item.name.capitalize()"
                      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.item.name}.png`"/>
                  </template>
                </td>
                <td v-for="(stat, i) in pokemon.stats" :key="i">{{ stat.base_stat }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from "../utils.js"
import PokeImage from '@/components/PokeImage.vue'

export default {
  name: 'Compare',
  components: {
    PokeImage
  },
  data() {
    return {
      pokedex: null,
      selectedPokemons: [],
      loading: false
    }
  },
  beforeMount() {
    this.pokedex = util.getPokedex().sort((a, b) => a.name > b.name ? 1 : -1);
  },
  methods: {
    async pokemonSelected() {
      let selectedIndex1 = this.$refs.pokemonSelect1.selectedIndex;
      let selectedIndex2 = this.$refs.pokemonSelect2.selectedIndex;

      if (selectedIndex1 > 0 && selectedIndex2 > 0 && selectedIndex1 !== selectedIndex2) {
        let selectedValue1 = this.$refs.pokemonSelect1.options[selectedIndex1].value;
        let selectedValue2 = this.$refs.pokemonSelect2.options[selectedIndex2].value;

        this.loading = true;
        this.selectedPokemons = [
          await util.getPokemonByNameOrId(selectedValue1),
          await util.getPokemonByNameOrId(selectedValue2),
        ];
        this.loading = false;
      }
    }
  }
}
</script>