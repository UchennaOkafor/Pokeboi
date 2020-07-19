const KEYS = {
  POKEMONS: "pokemons",
  FAVOURITES: "favourite_pokemons"
}

export let favouritePokemon = id => {
  let result = getFavoritedPokemons();
  if (! result.includes(id)) {
    saveFavoritedPokemons(result.concat(id));
  }
}

export let unfavouritePokemon = id => {
  let result = getFavoritedPokemons();
  if (result.includes(id)) {
    saveFavoritedPokemons(result.filter(item => item !== id));
  }
}

export let isPokemonFavourited = id => {
  return getFavoritedPokemons().includes(id);
}

export let getFavoritedPokemons = () => {
  return JSON.parse(localStorage.getItem(KEYS.FAVOURITES)) || [];
}

export let saveFavoritedPokemons = pokemons => {
  localStorage.setItem(KEYS.FAVOURITES, JSON.stringify(pokemons));
}