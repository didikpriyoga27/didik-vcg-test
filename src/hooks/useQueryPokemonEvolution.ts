import {useQuery} from '@tanstack/react-query';
import useFetch from './useFetch';
import Config from 'react-native-config';

type Params = {
  url?: string;
};

type Response = {
  chain: {
    evolves_to: {
      evolves_to: any;
      species: {
        name: string;
      };
    }[];
    species: {
      name: string;
    };
  };
};

export default function useQueryPokemonEvolution(params: Params) {
  const fetch = useFetch<Params, Response>(() => ({
    url: params.url?.replace(String(Config.BASE_URL), ''),
  }));
  return useQuery(['pokemon_evolution', params], () => {
    if (params?.url) {
      return fetch().then(result => {
        const results = [];
        let evolves_to = null;
        results?.push(result?.data?.chain?.species?.name);
        evolves_to = result?.data?.chain?.evolves_to;
        while (evolves_to?.length) {
          results?.push(evolves_to[0].species.name);
          evolves_to = evolves_to[0].evolves_to;
        }
        return results;
      });
    }
    return null;
  });
}
