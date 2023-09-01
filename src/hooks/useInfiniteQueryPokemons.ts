import {useInfiniteQuery} from '@tanstack/react-query';
import {FetchConfig} from '../api/fetch';
import useFetch from './useFetch';
import {PokemonItemProps} from '../components/pokemon/PokemonItem';

type Params = {
  limit?: number;
  offset?: number;
};

type Response = {
  count: number;
  results: PokemonItemProps[];
};

function _fetch(params?: Params): FetchConfig {
  return {
    method: 'GET',
    url: '/pokemon',
    params: {
      limit: params?.limit,
      offset: params?.offset,
    },
  };
}

export default function useInfiniteQueryPokemons(params: Params) {
  const limit = 8;
  const fetch = useFetch<Params, Response>(_fetch);
  return useInfiniteQuery(
    ['pokemon', params],
    ({pageParam = 0}) => {
      return fetch({limit, offset: limit * pageParam, ...params});
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.config.params.offset / limit + 1;
      },
    },
  );
}
