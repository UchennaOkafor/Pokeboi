const KEYS = {
  POKEDEX: "pokedex",
  FAVOURITES: "favourite_pokemons"
}

export let initializePokedex = async () => {
  let count = (await getJson("https://pokeapi.co/api/v2/pokemon/")).count;
  let response = await getJson(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`);
  localStorage.setItem(KEYS.POKEDEX, JSON.stringify(response.results));
}

export let isPokedexInitialized = () => {
  return JSON.parse(localStorage.getItem(KEYS.POKEDEX));
}

export let searchPokedex = (query, pageSize, page) => {
  const items = JSON.parse(localStorage.getItem(KEYS.POKEDEX));
  const pageFrom = (page - 1) * pageSize;
  const pageTo = page * pageSize; 

  const filteredResults = items.filter(e => e.name.includes(query));
  const totalPages = Math.ceil(filteredResults.length / pageSize);

  return {
    pagination: {
      totalPages,
      itemsPerPage: parseInt(pageSize),
      currentPage: parseInt(page),
    },
    results: filteredResults.slice(pageFrom, pageTo)
  }
}

export let getPokedexCount = () => {
  return JSON.parse(localStorage.getItem(KEYS.POKEDEX)).length;
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

let getJson = async url => await (await fetch(url)).json();
