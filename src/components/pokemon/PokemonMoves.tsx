import React, {FC} from 'react';
import View from '../View';
import Text from '../Text';

type Props = {
  moves?: {move: {name: string}}[];
};

const PokemonMoves: FC<Props> = ({moves}) => {
  if (!moves) {
    return null;
  }
  return (
    <View className="space-y-2">
      <Text>Moves:</Text>
      <View className={'flex-row flex-wrap items-center space-y-2'}>
        {moves?.splice(0, 10)?.map(move => {
          return (
            <View className="px-3 py-2 bg-white rounded mr-2">
              <Text className="text-black">{move?.move?.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PokemonMoves;
