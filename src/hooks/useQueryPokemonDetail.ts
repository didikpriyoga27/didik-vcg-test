import {useQuery} from '@tanstack/react-query';
import useFetch from './useFetch';

type Params = {
  pokemonName?: string;
};

type Pokemon = {
  id: number;
  abilities: {ability: {name: string}; is_hidden: boolean}[];
  sprites: {
    other: {
      home: {front_default: string; front_shiny: string};
      dream_world: {front_default: string};
      'official-artwork': {front_default: string; front_shiny: string};
    };
  };
  weight: number;
  height: number;
  types: {type: {name: string}}[];
  stats: {base_stat: number; stat: {name: string}}[];
};

export default function useQueryPokemonDetail(params: Params) {
  const fetch = useFetch<Params, Pokemon>(() => ({
    url: `/pokemon/${params.pokemonName}`,
  }));
  return useQuery(['pokemon_detail', params], () => {
    if (params?.pokemonName) {
      return fetch().then(result => result?.data);
    }
    return null;
  });
}
