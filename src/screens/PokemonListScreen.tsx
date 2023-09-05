import React, {useCallback, useMemo, useReducer, useState} from 'react';
import {FlatList, Pressable} from 'react-native';
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
import FavFilledSvg from '../assets/svg/FavFilledSvg';
import FavOutlinedSvg from '../assets/svg/FavOutlinedSvg';
import useFavoritePokemon from '../hooks/useFavoritePokemon';

const PokemonListScreen = () => {
  const [isShowFavorite, setIsShowFavorite] = useState(false);

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

  const onPress = useCallback(() => {
    dispatch({search: ''});
    setIsShowFavorite(!isShowFavorite);
  }, [isShowFavorite]);

  const {favoritePokemon} = useFavoritePokemon();

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
    if (isShowFavorite) {
      if (favoritePokemon?.length && favoritePokemon?.length % 2 !== 0) {
        return [...favoritePokemon, null];
      }
      return favoritePokemon;
    }
    if (params.search) {
      return pokemonDetailData
        ? [{name: pokemonDetailData?.name, url: ''}, null]
        : [];
    }
    return pokemonData?.pages.flatMap(p => p?.data?.results ?? []) ?? [];
  }, [
    favoritePokemon,
    isShowFavorite,
    params.search,
    pokemonData?.pages,
    pokemonDetailData,
  ]);

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
    if (isFetchingNextPage && !params.search && !isShowFavorite) {
      return renderPlaceholder();
    }
    return null;
  }, [isFetchingNextPage, isShowFavorite, params.search, renderPlaceholder]);

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingDetail) {
      return renderPlaceholder();
    }
    if (isShowFavorite) {
      return (
        <View className="space-y-4 p-4 items-center justify-center">
          <EmptyPokemonSvg />
          <Text className="text-black">
            You haven't added your favorite Pokemon yet
          </Text>
        </View>
      );
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
  }, [isLoadingDetail, isShowFavorite, params.search, renderPlaceholder]);

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage && !params.search) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, params.search]);

  return (
    <BaseLayout>
      <View className="items-center">
        <Text className="text-black text-center pt-4 text-2xl font-poppins_700">
          Pokemons
        </Text>
        <Pressable
          {...{onPress}}
          className="absolute right-4 top-2 bottom-0 justify-center">
          {isShowFavorite ? <FavFilledSvg /> : <FavOutlinedSvg />}
        </Pressable>
      </View>
      <View className="flex-row items-center p-2">
        <SearchInput
          placeholder="Search Pokemon"
          onChangeText={text => {
            dispatch({search: text});
            setIsShowFavorite(false);
          }}
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
