import React from 'react';
import View from '../View';
import Text from '../Text';
import useQueryPokemonSpecies from '../../hooks/useQueryPokemonSpecies';
import useQueryPokemonEvolution from '../../hooks/useQueryPokemonEvolution';
import PokemonEvolutionItem from './PokemonEvolutionItem';

type Props = {
  speciesUrl?: string;
};

export default function PokemonEvolution({speciesUrl}: Props) {
  const {data: pokemonSpeciesData, isLoading: isLoadingPokemonSpecies} =
    useQueryPokemonSpecies({url: speciesUrl});
  const {data: evolutionChainData, isLoading: isLoadingEvolutionChain} =
    useQueryPokemonEvolution({
      url: pokemonSpeciesData?.data?.evolution_chain?.url,
    });

  const isLoading = isLoadingPokemonSpecies || isLoadingEvolutionChain;

  if (isLoading || !speciesUrl) {
    return null;
  }

  return (
    <View className="py-2 space-y-2">
      <Text>Evolution : </Text>
      <View className="flex-row flex-wrap">
        {evolutionChainData?.map((item, index) => {
          return <PokemonEvolutionItem {...{name: item, index}} />;
        })}
      </View>
    </View>
  );
}
