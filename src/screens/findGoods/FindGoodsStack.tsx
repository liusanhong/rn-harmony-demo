// src/screens/findGoods/FindGoodsStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FindGoodsStackParamList } from '../../navigation/types';
import FindGoodsScreen from './FindGoodsScreen';

const Stack = createNativeStackNavigator<FindGoodsStackParamList>();

const FindGoodsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindGoods" component={FindGoodsScreen} />
    </Stack.Navigator>
  );
};

export default FindGoodsStack;
