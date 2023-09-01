import React from 'react';
import {StackParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';

const Stack = createNativeStackNavigator<StackParamList>();

export const navigationRef =
  React.createRef<NavigationContainerRef<StackParamList>>();

export default function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="PokemonListScreen" component={PokemonListScreen} />
        <Stack.Screen
          name="PokemonDetailScreen"
          component={PokemonDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
