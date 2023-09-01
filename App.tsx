import React from 'react';
import AppContainer from './src/AppContainer';

if (__DEV__) {
  import('./src/utils/reactotron').then(() =>
    console.log('Reactotron Configured'),
  );
}

function App(): JSX.Element {
  return <AppContainer />;
}

export default App;
