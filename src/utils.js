const KEYS = {
  POKEMONS: "pokemons",
  FAVOURITES: "favourite_pokemons"
}

let getJson = async url => await (await fetch(url)).json();

export let isPokedexInitialized = () => {
  return JSON.parse(localStorage.getItem(KEYS.POKEMONS));
}

export let initializePokedex = async () => {
  let count = (await getJson("https://pokeapi.co/api/v2/pokemon/")).count;
  let response = await getJson(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`);
  localStorage.setItem(KEYS.POKEMONS, JSON.stringify(response.results));
}

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

export let clearFavoritedPokemons = () => saveFavoritedPokemons([]);