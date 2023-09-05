import React, {FC} from 'react';
import Text from './Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigation/types';
import View from './View';
import BackButtonSvg from '../assets/svg/BackButtonSvg';

type Props = {
  title: string;
};

const Header: FC<Props> = ({...props}) => {
  const {title} = props;
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View className={'absolute w-full py-4 z-10'} style={{top: top + 16}}>
      <Text className="text-center text-lg">{title}</Text>
      <TouchableOpacity onPress={goBack} className="absolute p-4">
        <BackButtonSvg color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
