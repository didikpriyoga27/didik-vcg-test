import React, {FC} from 'react';
import View from '../View';
import Text from '../Text';

type Props = {
  types?: {type: {name: string}}[];
};

const PokemonTypes: FC<Props> = ({types}) => {
  if (!types) {
    return null;
  }
  return (
    <View className="mt-2">
      <Text>Types:</Text>
      <View className={'flex-row flex-wrap items-center space-y-2'}>
        {types?.map(type => {
          return (
            <View className="px-3 py-2 mr-2 bg-white rounded">
              <Text className="text-black">{type?.type?.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PokemonTypes;
