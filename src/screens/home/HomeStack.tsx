// src/screens/home/HomeStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../../navigation/types';
import HomeScreen from './HomeScreen';
import TestDetailScreen from './TestDetailScreen';
import Config from '../../utils/ConfigUtils';

const Stack = createNativeStackNavigator<HomeStackParamList>();



const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TestDetail" component={TestDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
