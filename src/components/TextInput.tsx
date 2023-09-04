import React, {FC, ReactNode, memo} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import View from './View';

export type CustomTextInputProps = {
  placeholder: string;
  leftComponent?: ReactNode;
  leftComponentOnPress?: () => void;
  rightComponent?: ReactNode;
  rightComponentOnPress?: () => void;
};

type Props = CustomTextInputProps & TextInputProps;

const TextInput: FC<Props> = props => {
  const {leftComponent, leftComponentOnPress, ...restProps} = props;

  return (
    <View className="flex-row">
      <RNTextInput
        className={`flex-1 rounded-full border border-grey-gradient-2 bg-white px-4 py-3 font-poppins_500 text-sm text-black ${
          restProps.multiline && 'h-20'
        }`}
        style={[
          restProps.multiline && {textAlignVertical: 'top'},
          Boolean(leftComponent) && {paddingLeft: 40},
        ]}
        placeholderTextColor={'#ACAEB8'}
        autoCapitalize="none"
        {...restProps}
      />
      {Boolean(leftComponent) && (
        <TouchableOpacity
          style={styles.leftComponent}
          onPress={leftComponentOnPress}>
          {leftComponent}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftComponent: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    padding: 16,
  },
});

export default memo(TextInput);
