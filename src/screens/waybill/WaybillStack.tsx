// src/screens/waybill/WaybillStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WaybillStackParamList } from '../../navigation/types';
import WaybillScreen from './WaybillScreen';

const Stack = createNativeStackNavigator<WaybillStackParamList>();

const WaybillStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Waybill" component={WaybillScreen} />
    </Stack.Navigator>
  );
};

export default WaybillStack;
