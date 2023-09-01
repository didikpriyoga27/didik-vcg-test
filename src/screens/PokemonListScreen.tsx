import React, {useCallback, useMemo} from 'react';
import {FlatList} from 'react-native';
import BaseLayout from '../components/BaseLayout';
import Text from '../components/Text';
import PokemonItem, {PokemonItemProps} from '../components/pokemon/PokemonItem';
import useInfiniteQueryPokemons from '../hooks/useInfiniteQueryPokemons';
import PokemonPlaceholder from '../components/pokemon/PokemonPlaceholder';
import {Fade, Placeholder} from 'rn-placeholder';

const PokemonListScreen = () => {
  const {
    data: pokemonData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQueryPokemons({});

  const data = useMemo(() => {
    return pokemonData?.pages.flatMap(p => p?.data?.results ?? []) ?? [];
  }, [pokemonData?.pages]);

  const renderItem = useCallback(
    ({item, index}: {item: PokemonItemProps; index: number}) => {
      return <PokemonItem {...{item, index}} />;
    },
    [],
  );

  const renderPlaceholder = useCallback(() => {
    return (
      <Placeholder Animation={Fade}>
        <FlatList
          data={Array(8).fill(0)}
          //@ts-ignore
          renderItem={({_, index}) => <PokemonPlaceholder {...{index}} />}
          numColumns={2}
        />
      </Placeholder>
    );
  }, []);

  const ListFooterComponent = useCallback(() => {
    if (isFetchingNextPage) {
      return renderPlaceholder();
    }
    return null;
  }, [isFetchingNextPage, renderPlaceholder]);

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <BaseLayout>
      <Text className="text-center p-4 text-2xl font-poppins_700">
        Pokemons
      </Text>
      {isLoading ? (
        renderPlaceholder()
      ) : (
        <FlatList
          {...{data, renderItem, ListFooterComponent, onEndReached}}
          onEndReachedThreshold={0.2}
          numColumns={2}
        />
      )}
    </BaseLayout>
  );
};

export default PokemonListScreen;
