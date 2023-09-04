import React, {FC, memo} from 'react';
import {Text as RNText, TextProps} from 'react-native';

const Text: FC<TextProps> = ({className, ...props}) => {
  return (
    <RNText
      className={`text-white text-sm font-poppins_400 ${className}`}
      {...props}
    />
  );
};

export default memo(Text);
