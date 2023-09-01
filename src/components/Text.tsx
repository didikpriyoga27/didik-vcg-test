import React, {FC, memo} from 'react';
import {Text as RNText, TextProps} from 'react-native';

const Text: FC<TextProps> = ({className, ...props}) => {
  return <RNText className={`text-xs text-black ${className}`} {...props} />;
};

export default memo(Text);
