<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-7 col-md-9">
        <form>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Type to begin search...">
          </div>
        </form>
      </div>
      <div class="col-5 col-md-3">
        <a class="btn btn-block btn-primary text-white mb-2">Clear favourites</a>
      </div>
    </div>
    <div class="row">
      <template v-for="i in 50">
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
