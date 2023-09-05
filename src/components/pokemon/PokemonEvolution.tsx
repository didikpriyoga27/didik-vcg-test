import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {StackParamList} from '../../navigation/types';
import View from '../View';
import Text from '../Text';
import useQueryPokemonSpecies from '../../hooks/useQueryPokemonSpecies';
import useQueryPokemonEvolution from '../../hooks/useQueryPokemonEvolution';

type Props = {
  speciesUrl: string;
};

export default function PokemonEvolution({speciesUrl}: Props) {
  const {width} = useWindowDimensions();
  //@ts-ignore
  const {push} = useNavigation<NavigationProp<StackParamList>>();
  const {data: pokemonSpeciesData, isLoading: isLoadingPokemonSpecies} =
    useQueryPokemonSpecies({url: speciesUrl});
  const {data: evolutionChainData, isLoading: isLoadingEvolutionChain} =
    useQueryPokemonEvolution({
      url: pokemonSpeciesData?.data?.evolution_chain?.url,
    });

  const isLoading = isLoadingPokemonSpecies || isLoadingEvolutionChain;

  if (isLoading) {
    return null;
  }

  return (
    <View className="py-2 space-y-2">
      <Text>Evolution : </Text>
      <View className="flex-row flex-wrap">
        {evolutionChainData?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                push('PokemonDetailScreen', {
                  pokemonName: item,
                })
              }>
              <View
                className="bg-white rounded-full mb-2 items-center justify-center"
                style={{
                  marginLeft: index % 3 === 0 ? 8 : 12,
                  width: (width - 72) / 3,
                  height: (width - 72) / 3,
                }}>
                <Text className="text-black">
                  {'Stage ' + Number(index + 1)}
                </Text>
              </View>
              <View
                style={{
                  maxWidth: (width - 72) / 3,
                  marginLeft: index % 3 === 0 ? 8 : 12,
                }}>
                <Text className="px-2 text-center mb-2 font-poppins_700">
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
