// App.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import TabNavigator from './src/navigation/TabNavigator';
import {store, persistor} from './src/store';

function AppContent() {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer >
        <TabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
