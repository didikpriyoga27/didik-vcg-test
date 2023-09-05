import React from 'react';
import {ScrollView, StatusBar, useWindowDimensions} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '../navigation/types';
import useQueryPokemonDetail from '../hooks/useQueryPokemonDetail';
import LinearGradient from 'react-native-linear-gradient';
import useBackgroundByTypes from '../hooks/useBackgroundByTypes';
import colors from '../utils/colors';
import FastImage from 'react-native-fast-image';
import Text from '../components/Text';
import View from '../components/View';
import Header from '../components/Header';
import PokemonEvolution from '../components/pokemon/PokemonEvolution';
import PokemonTypes from '../components/pokemon/PokemonTypes';
import PokemonMoves from '../components/pokemon/PokemonMoves';

const PokemonDetailScreen = () => {
  const {width} = useWindowDimensions();

  const {params} = useRoute<RouteProp<StackParamList, 'PokemonDetailScreen'>>();
  const {pokemonName} = params;
  const {data} = useQueryPokemonDetail({pokemonName});

  const backgroundType: any = data?.types?.[0].type?.name ?? 'normal';
  const backgrounds = useBackgroundByTypes();

  const front_default = data?.sprites?.front_default;
  const front_shiny = data?.sprites?.front_shiny;
  const back_default = data?.sprites?.back_default;
  const back_shiny = data?.sprites?.back_shiny;

  const spritesUri = [
    {text: 'Front \nDefault', uri: front_default},
    {text: 'Back \nDefault', uri: back_default},
    {text: 'Front \nShiny', uri: front_shiny},
    {text: 'Back \nShiny', uri: back_shiny},
  ];

  return (
    <View className="flex-1">
      <StatusBar barStyle={'light-content'} />
      <LinearGradient
        style={{borderRadius: 4, flex: 1}}
        colors={
          backgrounds[backgroundType] ?? [
            colors['dark-grey']['gradient-1'],
            colors['dark-grey']['gradient-2'],
          ]
        }>
        <Header title={'Pokemon Detail'} />
        <ScrollView>
          <FastImage
            source={{uri: data?.sprites?.other?.home?.front_default}}
            tw={'rounded-lg self-center'}
            style={{
              width: width - 12,
              height: width - 12,
              marginTop: 40,
            }}
            resizeMode="contain"
          />
          <Text className="text-center text-white text-xl my-2 font-poppins_700">
            {pokemonName}
          </Text>
          <View className={'space-y-2'}>
            <Text className="mx-4">Sprites:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row">
              {spritesUri.map((sprites, index) => {
                return (
                  <View className={`${index ? 'ml-0' : 'ml-4'} mr-4 space-y-1`}>
                    <FastImage
                      source={{uri: sprites.uri}}
                      style={{
                        width: width / 3 - 48,
                        height: width / 3 - 48,
                        backgroundColor: 'white',
                        borderRadius: 8,
                      }}
                    />
                    <Text className="text-center text-xs">{sprites.text}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <View className="m-4 space-y-2">
              <Text>
                Height:{' '}
                <Text className={'font-poppins_700'}>{data?.height}</Text>
              </Text>
              <Text>
                Weight:{' '}
                <Text className={'font-poppins_500'}>{data?.weight}</Text>
              </Text>
              <PokemonTypes types={data?.types} />
              <PokemonEvolution speciesUrl={data?.species?.url} />
              <PokemonMoves moves={data?.moves} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default PokemonDetailScreen;
