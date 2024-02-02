let pokemonInput = document.getElementById('pokemon-name');
let catchButton = document.querySelector('.catch-btn');
let pokemonContainer = document.querySelector('.pokemon-card-container');

function getPokemonData(event) {
    event.preventDefault();
    catchButton.addEventListener('click', async () => {
    let pokemonName = pokemonInput.value;
    pokemonName = pokemonName.toLowerCase();
    pokemonInput.value = '';
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const data = await response.json();
    const pokeCard = pokemonData(data);
    pokemonContainer.innerHTML += pokeCard;
    console.log(data);
    });
}


function pokemonType(data) {
  
  let typeStrings = '';

  for (let i = 0; i < data.types.length; i++) {
    if (data.types.length <= 1 ) {
      return typeStrings = data.types[0].type.name;
    } else {
      return typeStrings = `${data.types[0].type.name} / ${data.types[1].type.name} `;
    }
  }
 
}


function pokemonData(data) {
  pokemonType(data);

    let pokeData =
    ` <div class="pokemon-card">
    <div class="pokemon-dex-name d-flex" id="${data.id}">
      <h4>${data.name}</h4>
      <h4>#${data.id}</h4>
    </div>
    <div class="poke-card">
    <img src="/start-icon.png" alt="shiny icon" class="shiny-img d-flex" onclick="toggleShinyNonShiny(this)"/>
    <img src="${data.sprites.front_default}" alt="pikachu" class="pokemon-img non-shiny " />
    <img src="${data.sprites.front_shiny}" alt="pikachu" class="pokemon-img shiny hidden-shiny" />
    </div>
    <div class="pokemon-stats d-flex">
      <p>Type: ${pokemonType(data)} </p>
      <p>Ability: ${data.abilities[0].ability.name}</p>
      <p>Weight: ${data.weight}lbs</p>
      <p>Height: ${data.height}ft</p>
    </div>
    <button class="delete-btn">Delete</button>
  </div>`
  return pokeData;
}


function deletePokemon() {
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            let card = event.target.closest('.pokemon-card');

            if (card) {
                card.remove();
            }
        }
    });
}

deletePokemon();

let shinyBtn = document.querySelector('.shiny-img');

function toggleShinyNonShiny(element) {
  let card = element.closest('.pokemon-card');
  let nonShiny = card.querySelector('.non-shiny');
  let shiny = card.querySelector('.shiny');
  nonShiny.classList.toggle('hidden-shiny');
  shiny.classList.toggle('hidden-shiny');
}

