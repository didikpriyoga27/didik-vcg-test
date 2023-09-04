import React, {FC} from 'react';
import {useWindowDimensions} from 'react-native';
import View from '../View';
import Text from '../Text';
import useQueryPokemonDetail from '../../hooks/useQueryPokemonDetail';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import useBackgroundByTypes from '../../hooks/useBackgroundByTypes';

export type PokemonItemProps = {
  name: string;
};

type Props = {
  item: PokemonItemProps;
  index: number;
};

const PokemonItem: FC<Props> = ({item, index}) => {
  const {width} = useWindowDimensions();
  const {name} = item;
  const {data} = useQueryPokemonDetail({pokemonName: name});

  const backgroundType: any = data?.types?.[0].type?.name ?? 'normal';

  const backgrounds = useBackgroundByTypes();

  return (
    <View
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
      </LinearGradient>
    </View>
  );
};

export default PokemonItem;
