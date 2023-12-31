import React, {FC, useCallback} from 'react';
import {Pressable, useWindowDimensions} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigation/types';
import Text from '../Text';
import useQueryPokemonDetail from '../../hooks/useQueryPokemonDetail';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import useBackgroundByTypes from '../../hooks/useBackgroundByTypes';
import useFavoritePokemon from '../../hooks/useFavoritePokemon';
import FavFilledSvg from '../../assets/svg/FavFilledSvg';
import FavOutlinedSvg from '../../assets/svg/FavOutlinedSvg';

export type PokemonItemProps = {
  name: string;
  url: string;
};

type Props = {
  item: PokemonItemProps;
  index: number;
};

const PokemonItem: FC<Props> = ({item, index}) => {
  const {width} = useWindowDimensions();
  const {name} = item;
  const {data} = useQueryPokemonDetail({pokemonName: name});
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();

  const backgroundType: any = data?.types?.[0].type?.name ?? 'normal';

  const backgrounds = useBackgroundByTypes();

  const {favoritePokemon, addPokemon, removePokemon} = useFavoritePokemon();

  const isFavorite = favoritePokemon.some(pokemon => pokemon.name === name);

  const onFavPress = useCallback(() => {
    if (isFavorite) {
      return removePokemon(name);
    }
    return addPokemon({name, url: item?.url});
  }, [addPokemon, isFavorite, item?.url, name, removePokemon]);

  return (
    <Pressable
      onPress={() => navigate('PokemonDetailScreen', {pokemonName: name})}
      className={`flex-1 mb-2 items-center space-y-4 ${
        index % 2 === 0 ? 'ml-2 mr-1' : 'ml-1 mr-2'
      }`}>
      <LinearGradient
        style={{borderRadius: 4}}
        colors={
          backgrounds[backgroundType] ?? [
            colors['dark-grey']['gradient-1'],
            colors['dark-grey']['gradient-2'],
          ]
        }>
        <FastImage
          source={{uri: data?.sprites?.other?.home?.front_default}}
          tw={'rounded-lg self-center'}
          style={{
            width: width / 2 - 12,
            height: width / 2 - 12,
          }}
          resizeMode="contain"
        />
        <Text className="text-center text-white text-xl my-2">{name}</Text>
        <Pressable onPress={onFavPress} className="absolute top-2 left-2">
          {isFavorite ? (
            <FavFilledSvg />
          ) : (
            <FavOutlinedSvg fill={colors.grey['gradient-2']} />
          )}
        </Pressable>
      </LinearGradient>
    </Pressable>
  );
};

export default PokemonItem;
