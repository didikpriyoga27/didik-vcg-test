import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigation/types';
import View from '../View';
import Text from '../Text';
import useQueryPokemonDetail from '../../hooks/useQueryPokemonDetail';
import FastImage from 'react-native-fast-image';

type Props = {
  name: string;
  index: number;
};

const PokemonEvolutionItem: FC<Props> = ({name, index}) => {
  const {width} = useWindowDimensions();
  //@ts-ignore
  const {push} = useNavigation<NavigationProp<StackParamList>>();
  const {data} = useQueryPokemonDetail({pokemonName: name});

  return (
    <TouchableOpacity
      onPress={() =>
        push('PokemonDetailScreen', {
          pokemonName: name,
        })
      }>
      <FastImage
        source={{uri: data?.sprites?.other?.home?.front_default}}
        style={{
          marginLeft: index % 3 === 0 ? 8 : 12,
          width: (width - 72) / 3,
          height: (width - 72) / 3,
          marginBottom: 8,
        }}
      />
      <View
        style={{
          maxWidth: (width - 72) / 3,
          marginLeft: index % 3 === 0 ? 8 : 12,
        }}>
        <Text className="px-2 text-center mb-2 font-poppins_700">{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonEvolutionItem;
