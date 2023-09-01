import React, {FC, memo} from 'react';
import {View as RNView, ViewProps} from 'react-native';

const View: FC<ViewProps> = ({...props}) => {
  return <RNView {...props} />;
};

export default memo(View);
