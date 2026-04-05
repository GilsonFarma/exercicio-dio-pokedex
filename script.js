const input = document.getElementById('input1');
const btnSearch = document.getElementById('bnt-search');
const listaPoke = document.getElementById('lista-poke');
const morePoke = document.getElementById('more-poke');
const error = document.getElementById('error');

let offset = 0;
let limit = 10;

async function carregarPokemons() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        
       for (const pokemon of data.results) {
            const buscarimg = await fetch(pokemon.url);
            const pokeData = await buscarimg.json();
            const img = document.createElement('img');
            img.src = pokeData.sprites.front_default;
            img.alt = pokemon.name;
            const title = document.createElement('h2');
            title.textContent = pokemon.name;
            const li = document.createElement('li');
            li.appendChild(title);
            li.appendChild(img);
            listaPoke.appendChild(li);
        }
    } catch (err) {
        error.textContent = 'Erro ao carregar os pokemons';
    }
    };
carregarPokemons();
morePoke.addEventListener('click', () => {
    offset += limit;
    carregarPokemons();
});

async function buscarPokemon() {
    const pokemonName = input.value.toLowerCase();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        listaPoke.innerHTML = '';
        error.textContent = '';
        const img = document.createElement('img');
        img.src = data.sprites.front_default;
        img.alt = data.name;
        const title = document.createElement('h2');
        title.textContent = data.name;
        const li = document.createElement('li');
        li.appendChild(title);
        li.appendChild(img);
        listaPoke.appendChild(li);
    } catch (err) {
        error.textContent = 'Pokemon não encontrado';
    }
} 

btnSearch.addEventListener('click', buscarPokemon);  

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        buscarPokemon();
    }});