import { colors, pokedexURL } from "./constants.js";
import { fetchJson } from "./utils.js";

const pokeContainer = document.getElementById("poke-container");
const searchInput = document.getElementById("search-bar");

// toggle nav active
$(function () {
  $("a").click(function () {
    $("a").removeClass("active");
    $(this).addClass("active");
  });
});

// init home page animations
$(function () {
  $(".content-container").hide().fadeIn(3000);
  $("#banner-img").hide().fadeIn(3000);
});

// hamburger menu toggle
$(function () {
  $(".hamburger").click(function (e) {
    $(".nav-bar").toggleClass("nav-bar-toggle");
    $(".nav-list").toggleClass("nav-list-toggle");
    e.preventDefault();
  });
});

//scroll to pokedex page
$(".see-pokemons-btn").click(function (e) {
  document.getElementById("pokedex-section").scrollIntoView();
  e.preventDefault();
});

// fetching pokemons
const pokeCount = 50;
const initPokemon = async () => {
  for (let i = 1; i < pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let data = await fetchJson(pokedexURL + id);
  createPokemonBox(data);
};

// pokebox
const createPokemonBox = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const image = pokemon.sprites.other["official-artwork"].front_default;
  const attack = pokemon.stats[1].base_stat;
  const defense = pokemon.stats[2].base_stat;
  const type = pokemon.types[0].type.name;
  const boxColor = colors[type];

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.style.background = `linear-gradient(
    to right,
    white 0%,
    white 40%,
    ${boxColor} 40%,
    ${boxColor} 100%
  )`;

  pokemonEl.innerHTML = `
  <img
  src="${image}"
  />
  <h1 class="poke-name">${name}</h1>
  <div class="stats-container">
   <div class="attack-container">
    <div class="circular-stat">${attack}</div>
    <h4>Atk</h4>
   </div>
   <div class="defense-container">
     <div class="circular-stat">${defense}</div>
    <h4>Def</h4>
   </div>
  </div>
  <div class="type-container" style="background-color : ${boxColor}">
  <div class="poke-type" style="color : black">${type}</div>
  </div>
  `;

  pokeContainer.appendChild(pokemonEl);
};

// search pokemon

searchInput.addEventListener("input", function () {
  const pokeNames = document.querySelectorAll(".poke-name");
  const search = searchInput.value.toLowerCase();

  pokeNames.forEach((pokeName) => {
    pokeName.parentElement.style.display = "flex";
    if (!pokeName.innerHTML.toLowerCase().includes(search)) {
      pokeName.parentElement.style.display = "none";
    }
  });
});

initPokemon();
