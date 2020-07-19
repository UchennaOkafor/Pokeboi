const KEYS = {
  POKEMONS: "pokemons",
  FAVOURITES: "favourite_pokemons"
}

export let isPokedexInitialized = () => localStorage.getItem(KEYS.POKEMONS) != null;

export let toggleFavouritePokemon = id => {
  let result = getFavoritedPokemons();
  if (! result.includes(id)) {
    saveFavoritedPokemons(result.concat(id));
  } else {
    saveFavoritedPokemons(result.filter(item => item !== id));
  }
}

export let isPokemonFavourited = id => getFavoritedPokemons().includes(id);

export let getFavoritedPokemons = () => JSON.parse(localStorage.getItem(KEYS.FAVOURITES)) || [];

export let saveFavoritedPokemons = pokemons => localStorage.setItem(KEYS.FAVOURITES, JSON.stringify(pokemons));