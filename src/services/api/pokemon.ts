import {LIMIT} from '../../config/constants';

const baseURL = 'https://pokeapi.co/api/v2/';

enum PathURL {
  List = 'pokemon',
}

function fetchPokemonList(offset: number, limit: number = LIMIT) {
  return fetch(`${baseURL}${PathURL.List}?offset=${offset}&limit=${limit}`);
}

function fetchPokemonById(id: number) {
  return fetch(`${baseURL}${PathURL.List}/${id}`);
}

function makeCryPath(id: number) {
  return `https://pokemoncries.com/cries/${id}.mp3`;
}

function imagePath(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
}

export {fetchPokemonList, makeCryPath, fetchPokemonById, imagePath};
