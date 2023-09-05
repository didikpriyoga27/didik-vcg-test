import {atom} from 'recoil';

export const pokemonState = atom<{name: string; url: string}[]>({
  key: 'pokemonState',
  default: [],
});
