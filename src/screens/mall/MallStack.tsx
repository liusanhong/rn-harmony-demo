// src/screens/mall/MallStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MallStackParamList } from '../../navigation/types';
import MallScreen from './MallScreen';

const Stack = createNativeStackNavigator<MallStackParamList>();

const MallStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Mall" component={MallScreen} />
    </Stack.Navigator>
  );
};

export default MallStack;
