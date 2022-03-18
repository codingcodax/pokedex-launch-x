const POKE_API_URL = "https://pokeapi.co/api/v2";
const searchPokemonForm = document.getElementById("searchPokemonForm");
const pokemonInput = document.getElementById("pokemonInput");

const getPokemonData = async (pokemonName) => {
  const searchMessage = document.getElementById('searchMessage')
  
  try {    const res = await fetch(`${POKE_API_URL}/pokemon/${pokemonName.toLowerCase()}`);
    const { id, name, height, weight, types, stats, sprites } = await res.json();
    const pokemon = {
      id,
      name,
      img: sprites.other.home.front_default,
      height: height / 10,
      weight: weight / 10,
      types: types.map(({ type }) => type.name),
      stats: stats.map(({ base_stat, stat }) => ({
        name: stat.name,
        value: base_stat,
      })),
    };

    searchMessage.classList.remove('error')
    searchMessage.classList.add('success')
    searchMessage.textContent = 'Pokémon was succesfully found'

    return pokemon;
  } catch (error) {
    searchMessage.classList.remove('success')
    searchMessage.classList.add('error')
    searchMessage.textContent = 'Pokémon does not exist, please try again'
    
    throw new Error('Pokémon does not exist, please try again')
  }
};

const setPokemon = ({ id, name, img, height, weight, types, stats }) => {
  const pokemonName = document.getElementById("pokemonName");
  const pokemonId = document.getElementById("pokemonId");
  const pokemonHeight = document.getElementById("pokemonHeight");
  const pokemonWeight = document.getElementById("pokemonWeight");
  const pokemonImage = document.getElementById("pokemonImage");
  const pokemonTypes = document.getElementById('pokemonTypes')
  const pokemonStats = document.getElementById('pokemonStats')

  pokemonName.textContent = name;
  pokemonId.textContent = `#${id}`;
  pokemonHeight.textContent = height;
  pokemonWeight.textContent = weight;
  pokemonImage.setAttribute('src', img)
  pokemonTypes.innerHTML = types.map((type) => `<li class="pokemon__type">${type}</p>`).join(' ')
  pokemonStats.innerHTML = stats.map(({name, value}) => `<li class="pokemon__stat">${name.replace('-', ' ')}: ${value}</li>`).join(' ')
};

searchPokemonForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pokemonToSearch = pokemonInput.value;
  const pokemonData = await getPokemonData(pokemonToSearch);
  setPokemon(pokemonData);
});
