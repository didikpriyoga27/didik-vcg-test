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

  const spritesUri = [front_default, front_shiny, back_default, back_shiny];

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
        <FastImage
          source={{uri: data?.sprites?.other?.home?.front_default}}
          tw={'rounded-lg self-center'}
          style={{
            width: width - 12,
            height: width - 12,
          }}
          resizeMode="contain"
        />
        <Text className="text-center text-white text-xl my-2 font-poppins_700">
          {pokemonName}
        </Text>
        <View className={'space-y-2'}>
          <Text className="mx-4">Sprites</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row">
            {spritesUri.map((uri, index) => {
              return (
                <View>
                  <FastImage
                    source={{uri}}
                    style={{
                      width: width / 3 - 24,
                      height: width / 3 - 24,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      marginLeft: index ? 0 : 16,
                      marginRight: 16,
                    }}
                  />
                  <Text></Text>
                </View>
              );
            })}
          </ScrollView>
          <View className="m-4 space-y-2">
            <Text>
              Height: <Text className={'font-poppins_700'}>{data?.height}</Text>
            </Text>
            <Text>
              Weight: <Text className={'font-poppins_500'}>{data?.weight}</Text>
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PokemonDetailScreen;
