const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const typesContainer = document.querySelector('.pokemon__types');
const painelTipos = document.querySelector('.painel-tipos');
const somBusca = new Audio('./sound/busca.mp3');
const somErro = new Audio('./sound/erro.mp3');





const tipoTraduzido = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Planta',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Venenoso',
  ground: 'Terra',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dark: 'Sombrio',
  dragon: 'Dragão',
  steel: 'Aço',
  fairy: 'Fada'
};


let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  typesContainer.innerHTML = '';
  painelTipos.classList.remove('visivel');

  const data = await fetchPokemon(pokemon);

  if (data) {
    somBusca.currentTime = 0;
    somBusca.play();
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
     pokemonImage.src = data.sprites.other['official-artwork'].front_default;
    input.value = '';
    searchPokemon = data.id;

    data.types.forEach((typeInfo) => {
      const typeSpan = document.createElement('span');
      typeSpan.textContent = tipoTraduzido[typeInfo.type.name] || typeInfo.type.name;
      typeSpan.classList.add('pokemon__type', `type-${typeInfo.type.name}`);
      typesContainer.appendChild(typeSpan);
      // Mostrar altura e peso
      const heightElement = document.querySelector('.pokemon__height');
      const weightElement = document.querySelector('.pokemon__weight');

      const alturaEmMetros = data.height / 10;
      const pesoEmKg = data.weight / 10;

      heightElement.innerHTML = `📏 Altura: ${alturaEmMetros.toFixed(1)} m`;
      weightElement.innerHTML = `⚖️ Peso: ${pesoEmKg.toFixed(1)} kg`;


    });

    // Ativa o painel animado se houver tipos
    if (data.types.length > 0) {
      painelTipos.classList.add('visivel');
    }
  } else {
    somErro.currentTime = 0;
    somErro.play();

    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não encontrado :c';
    pokemonNumber.innerHTML = '';
    typesContainer.innerHTML = '';
    heightElement.innerHTML = '';
    weightElement.innerHTML = '';

    painelTipos.classList.remove('visivel');

    
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

const toggleDarkMode = document.querySelector('.toggle-dark');

toggleDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});