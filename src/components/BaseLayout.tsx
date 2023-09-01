import React, {FC, PropsWithChildren, memo} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';

type Props = {
  title?: string;
} & PropsWithChildren;

const BaseLayout: FC<Props> = ({children}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View className={'flex-1'} style={{paddingTop: top}}>
      <LinearGradient
        colors={[colors.grey['gradient-1'], colors.grey['gradient-2']]}
        style={{...StyleSheet.absoluteFillObject}}
      />
      <KeyboardAvoidingView
        className={'flex-1'}
        behavior={Platform.select({ios: 'padding', android: 'height'})}
        keyboardVerticalOffset={0}>
        <View className={'flex-1'}>{children}</View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default memo(BaseLayout);
