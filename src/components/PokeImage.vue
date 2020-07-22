<template>
  <img :src="pictureUrl" :data-fallback-src="imageFallbackSrc" 
        :class="classes" :height="height" alt="Pokémon"
        @error="handleImageError" @click="$emit('clicked')" />
</template>

<script>
export default {
  name: 'PokeImage',
  props: {
    id: Number,
    classes: String,
    height: Number
  },
  data() {
    return {
      imageFallbackSrc: "https://drinkedin.net/components/com_easyblog/themes/wireframe/images/placeholder-image.png"
    }
  },
  methods: {
    handleImageError(e) {
      let fallbackSrc = e.target.dataset.fallbackSrc;
      if (e.target.src != fallbackSrc) {
        e.target.src = fallbackSrc;
      }
    }
  },
  computed: {
    pictureUrl() {
      //The Id of the pokeapi.co skips by 9194 after 807, rather than being sequential
      //This uses a fallback for the broken images
      if (this.id <= 807) {
        return `https://pokeres.bastionbot.org/images/pokemon/${this.id}.png`;
      } else {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
      }
    }
  }
}
</script>

<style scoped>

</style>