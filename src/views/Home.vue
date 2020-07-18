<template>
  <div class="container">
    <div class="row">
      <template v-for="i in 15">
        <div class="col-3 px-3 py-3" :key="i">
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
  }
}
</script>
