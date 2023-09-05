import {useRecoilState} from 'recoil';
import {pokemonState} from '../recoil/pokemonState';

const useFavoritePokemon = () => {
  const [favoritePokemon, setFavoritePokemon] = useRecoilState(pokemonState);

  const addPokemon = ({name, url}: {name: string; url: string}) => {
    if (name.trim() === '') {
      return;
    }
    const newPokemon = {name: name.trim(), url};
    setFavoritePokemon([...favoritePokemon, newPokemon]);
  };

  const removePokemon = (name: string) => {
    const updatedList = favoritePokemon.filter(
      pokemon => pokemon.name !== name,
    );
    setFavoritePokemon(updatedList);
  };

  return {favoritePokemon, addPokemon, removePokemon};
};

export default useFavoritePokemon;
