import {useQuery} from '@tanstack/react-query';
import useFetch from './useFetch';
import Config from 'react-native-config';

type Params = {
  url?: string;
};

type Response = {
  evolution_chain: {
    url: string;
  };
};

export default function useQueryPokemonSpecies(params: Params) {
  const fetch = useFetch<Params, Response>(() => ({
    url: params.url?.replace(String(Config.BASE_URL), ''),
  }));
  return useQuery(['pokemon_species', params], () => {
    if (params?.url) {
      return fetch();
    }
    return null;
  });
}
