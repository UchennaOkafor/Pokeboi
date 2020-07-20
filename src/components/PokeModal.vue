<template>
  <div>
    <div :id="modalId" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">{{ pokemon.name.capitalize() }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <poke-image :id="pokemon.id" classes="w-25 mx-auto pt-2"></poke-image>
          </div>
          <div class="row justify-content-center my-3">
            <template v-for="(type, i) in pokemon.types">
              <span :key="i" class="badge badge-light mx-1 text-muted">{{ type.type.name.capitalize() }}</span>
            </template>
          </div>
          <div class="row no-gutters">
            <div class="col-4 pt-2 pb-0 text-center border-right">
              <h6 class="text-uppercase text-dark">Base XP</h6>
              <h6 class="mb-0 text-secondary">{{ pokemon.base_experience }}</h6>
            </div>
            <div class="col-4 pt-2 pb-0 text-center">
              <h6 class="text-uppercase text-dark">Weight</h6>
              <h6 class="mb-0 text-secondary">{{ pokemon.weight / 10 }} kg</h6>
            </div>
            <div class="col-4 pt-2 pb-0 text-center border-left">
              <h6 class="text-uppercase text-dark">Height</h6>
              <h6 class="mb-0 text-secondary">{{ pokemon.height * 10 }} cm</h6>
            </div>
          </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import PokeImage from './PokeImage.vue'

export default {
  name: 'PokeModal',
  props: {
    pokemon: null,
  },
  components: { PokeImage },
  data() {
    return {

    }
  },
  created() {
    
  },
  beforeMount() {
  },
  methods: {

  },
  computed: {
    modalId() {
      return `pokeModal-${this.pokemon.name}`;
    }
  }
}
</script>

<style scoped>
.modal-dialog {

}
</style>