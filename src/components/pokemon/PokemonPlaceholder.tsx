import React, {FC} from 'react';
import {useWindowDimensions} from 'react-native';
import {PlaceholderLine} from 'rn-placeholder';

type Props = {
  index?: number;
};

const PokemonPlaceholder: FC<Props> = ({index}) => {
  const {width} = useWindowDimensions();
  return (
    <PlaceholderLine
      className={`mb-2 ${
        typeof index === 'number'
          ? Number(index) % 2 === 0
            ? 'ml-2 mr-1'
            : 'ml-1 mr-2'
          : ''
      }`}
      style={{width: width / 2 - 12, height: 228}}
    />
  );
};

export default PokemonPlaceholder;
