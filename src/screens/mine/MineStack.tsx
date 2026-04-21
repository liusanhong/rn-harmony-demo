// src/screens/mine/MineStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MineStackParamList } from '../../navigation/types';
import MineScreen from './MineScreen';

const Stack = createNativeStackNavigator<MineStackParamList>();

const MineStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Mine" component={MineScreen} />
    </Stack.Navigator>
  );
};

export default MineStack;
