<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-end">
        <a class="btn btn-primary text-white">Clear favourites</a>
      </div>
    </div>
    <div class="row">
      <template v-for="i in 20">
        <div class="col-6 col-md-4 col-lg-3 col-xl-2 px-3 py-3" :key="i">
          <PokeCard :id="i"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PokeCard from '@/components/PokeCard.vue'

export default {
  name: 'Home',
  components: {
    PokeCard
  },
  beforeMount() {
  }
}
</script>
