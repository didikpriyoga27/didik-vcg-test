import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigation/types';
import BaseLayout from '../components/BaseLayout';
import Text from '../components/Text';

const PokemonListScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  return (
    <BaseLayout>
      <Text
        onPress={() => navigate('PokemonDetailScreen')}
        className="text-red-500">
        Pokemons
      </Text>
    </BaseLayout>
  );
};

export default PokemonListScreen;
