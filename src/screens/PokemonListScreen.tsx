import React, {useCallback, useMemo, useReducer} from 'react';
import {FlatList} from 'react-native';
import {Fade, Placeholder} from 'rn-placeholder';
import BaseLayout from '../components/BaseLayout';
import Text from '../components/Text';
import PokemonItem, {PokemonItemProps} from '../components/pokemon/PokemonItem';
import useInfiniteQueryPokemons from '../hooks/useInfiniteQueryPokemons';
import PokemonPlaceholder from '../components/pokemon/PokemonPlaceholder';
import SearchInput from '../components/SearchInput';
import View from '../components/View';
import useQueryPokemonDetail from '../hooks/useQueryPokemonDetail';
import EmptyPokemonSvg from '../assets/svg/EmptyPokemonSvg';

const PokemonListScreen = () => {
  const [params, dispatch] = useReducer(
    //@ts-ignore
    (oldState, newState) => ({
      ...oldState,
      ...newState,
    }),
    {
      search: '',
    },
  );

  const {
    data: pokemonData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQueryPokemons({});

  const {data: pokemonDetailData, isLoading: isLoadingDetail} =
    useQueryPokemonDetail({
      pokemonName: params.search.toLowerCase(),
    });

  const data = useMemo(() => {
    if (params.search) {
      return pokemonDetailData
        ? [{name: pokemonDetailData?.name, url: ''}, null]
        : [];
    }
    return pokemonData?.pages.flatMap(p => p?.data?.results ?? []) ?? [];
  }, [params.search, pokemonData?.pages, pokemonDetailData]);

  const renderItem = useCallback(
    ({item, index}: {item: PokemonItemProps | null; index: number}) => {
      if (item) {
        return <PokemonItem {...{item, index}} />;
      }
      return <View className="flex-1" />;
    },
    [],
  );

  const renderPlaceholder = useCallback(() => {
    return (
      <Placeholder Animation={Fade}>
        <FlatList
          data={Array(8).fill(0)}
          renderItem={({index}) => <PokemonPlaceholder {...{index}} />}
          numColumns={2}
        />
      </Placeholder>
    );
  }, []);

  const ListFooterComponent = useCallback(() => {
    if (isFetchingNextPage && !params.search) {
      return renderPlaceholder();
    }
    return null;
  }, [isFetchingNextPage, params.search, renderPlaceholder]);

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingDetail) {
      return renderPlaceholder();
    }
    if (params.search) {
      return (
        <View className="space-y-4 p-4 items-center justify-center">
          <EmptyPokemonSvg />
          <Text className="text-black">
            There is no pokemon named "{params.search}"
          </Text>
        </View>
      );
    }
  }, [isLoadingDetail, params.search, renderPlaceholder]);

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage && !params.search) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, params.search]);

  return (
    <BaseLayout>
      <Text className="text-black text-center pt-4 text-2xl font-poppins_700">
        Pokemons
      </Text>
      <View className="flex-row items-center p-2">
        <SearchInput
          placeholder="Search Pokemon"
          onChangeText={text => dispatch({search: text})}
          defaultValue={params.search}
        />
      </View>
      {isLoading ? (
        renderPlaceholder()
      ) : (
        <FlatList
          {...{
            data,
            renderItem,
            ListFooterComponent,
            ListEmptyComponent,
            onEndReached,
          }}
          onEndReachedThreshold={0.2}
          numColumns={2}
        />
      )}
    </BaseLayout>
  );
};

export default PokemonListScreen;
