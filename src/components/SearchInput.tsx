import React, {memo} from 'react';
import TextInput, {CustomTextInputProps} from './TextInput';
import {TextInputProps} from 'react-native';
import SearchSvg from '../assets/svg/SearchSvg';
import useDebounce from '../hooks/useDebounce';

type Props = {
  onChangeText: (text: string) => any;
} & CustomTextInputProps &
  TextInputProps;

const SearchInput = ({placeholder, onChangeText, ...props}: Props) => {
  const debounce = useDebounce();
  const handleOnChangeText = debounce((e: string) => {
    onChangeText?.(e);
  }, 500);

  return (
    <TextInput
      leftComponent={<SearchSvg />}
      {...{placeholder}}
      {...props}
      onChangeText={handleOnChangeText}
    />
  );
};

export default memo(SearchInput);
