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
              <h6 class="text-dark">Base XP</h6>
              <h6 class="mb-0 text-secondary">{{ pokemon.base_experience }}</h6>
            </div>
            <div class="col-4 pt-2 pb-0 text-center">
              <h6 class="text-dark">Weight</h6>
              <h6 class="mb-0 text-secondary">{{ pokemon.weight / 10 }} kg</h6>
            </div>
            <div class="col-4 pt-2 pb-0 text-center border-left">
              <h6 class="text-dark">Height</h6>
              <h6 class="mb-0 text-secondary">{{ pokemon.height * 10 }} cm</h6>
            </div>
          </div>
          <div class="form-group mt-4">
            <h6 class="text-secondary">Held Items</h6>
            <template v-if="pokemon.held_items.length === 0">
              <p class="h6 font-weight-light">This Pokemon doesn't hold any items</p>
            </template>
            <template v-else>
              <template v-for="(item, i) in pokemon.held_items">
              <img :key="i" alt="Held item" class="mx-2" :title="item.item.name.capitalize()"
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.item.name}.png`"/>
            </template>
            </template>
          </div>
          <div class="form-group mt-4 pt-2">
            <h6 class="text-secondary">Base Stats</h6>
              <table class="table table-borderless table-sm">
                <thead class="thead-light">
                  <tr>
                    <th>HP</th>
                    <th>Attack</th>
                    <th>Defense</th>
                    <th>Sp. Atk</th>
                    <th>Sp. Def</th>
                    <th>Speed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-for="(stat, i) in pokemon.stats" :key="i">{{ stat.base_stat }}</td>
                  </tr>
                </tbody>
              </table>
          </div>
          
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
    modalId: String,
    pokemon: null,
  },
  components: { PokeImage }
}
</script>