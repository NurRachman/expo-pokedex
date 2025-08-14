import { BaseResponse } from "@/types/baseResponse";
import { PokemonFiltered, PokemonInfo, PokemonItem } from "@/types/pokemonTypes";

type PokemonFilterType = 'pokemon-habitat' | 'pokemon-shape' | 'pokemon-species'

export const fetchPokemonFilterType = async (type: PokemonFilterType): Promise<BaseResponse<PokemonItem[]>> => {
  const response = await fetch(`https://pokeapi.co/api/v2/${type}`);
  return await response.json();
};

export const fetchPokemonFilterList = async (type: PokemonFilterType, id: string): Promise<PokemonFiltered> => {
  const response = await fetch(`https://pokeapi.co/api/v2/${type}/${id}`);
  return await response.json();
};

export const fetchPokemon = async (): Promise<BaseResponse<PokemonItem[]>> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  return await response.json();
};

export const fetchPokemonInfo = async (id: string): Promise<PokemonInfo> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw Error('Something Wrong');
  }
  return await response.json();
};