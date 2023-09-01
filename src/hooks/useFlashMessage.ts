import {useCallback} from 'react';
import {showMessage} from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';

export default function useFlashMessage() {
  const errorMessage = useCallback((message: any) => {
    NetInfo.fetch().then(async state => {
      var error = !state.isConnected
        ? 'Oops.. it seems the your internet connection is not stable. Please check the connection and try again :)'
        : message?.response
        ? message?.response?.data?.message
        : message;
      return showMessage({
        message: error,
        type: 'danger',
        backgroundColor: 'rgb(239 68 68)',
        titleStyle: {fontFamily: 'Poppins-Medium'},
        duration: 7000,
      });
    });
  }, []);

  const successMessage = useCallback((message: any) => {
    showMessage({
      message: message?.response ? message?.response?.data?.message : message,
      type: 'success',
      backgroundColor: 'rgb(34 197 94)',
      icon: 'success',
      titleStyle: {fontFamily: 'Poppins-Medium'},
    });
  }, []);

  return {errorMessage, successMessage};
}
