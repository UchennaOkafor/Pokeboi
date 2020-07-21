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
              <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
              <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option selected>Select Pokémon</option>
                <option value="1">Pikachu</option>
                <option value="2">Ash</option>
                <option value="3">Naruto</option>
              </select>
            </div>
            <div class="col-auto my-1">
              <span class="h5">vs</span>
            </div>
            <div class="col-auto my-1">
              <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
              <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option selected>Select Pokémon</option>
                <option value="1">Pikachu</option>
                <option value="2">Ash</option>
                <option value="3">Naruto</option>
              </select>
            </div>
          </div>
        </form>
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
    this.pokedex = util.getPokedex();
  },
  methods: {

  }
}
</script>