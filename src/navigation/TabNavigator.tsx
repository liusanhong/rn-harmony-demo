// src/navigation/TabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import { TabParamList } from './types';
import HomeStack from '../screens/home/HomeStack';
import FindGoodsStack from '../screens/findGoods/FindGoodsStack';
import WaybillStack from '../screens/waybill/WaybillStack';
import MallStack from '../screens/mall/MallStack';
import MineStack from '../screens/mine/MineStack';

const Tab = createBottomTabNavigator<TabParamList>();

// Tab 配置数据
const tabConfigs = [
  {
    name: 'HomeTab',
    label: '首页',
    component: HomeStack,
    normalIcon: require('../assets/icons/tab/home.png'),
    activeIcon: require('../assets/icons/tab/home_active.png'),
  },
  {
    name: 'FindGoodsTab',
    label: '找货',
    component: FindGoodsStack,
    normalIcon: require('../assets/icons/tab/find.png'),
    activeIcon: require('../assets/icons/tab/find_active.png'),
  },
  {
    name: 'WaybillTab',
    label: '运单',
    component: WaybillStack,
    normalIcon: require('../assets/icons/tab/waybill.png'),
    activeIcon: require('../assets/icons/tab/waybill_active.png'),
  },
  {
    name: 'MallTab',
    label: '商城',
    component: MallStack,
    normalIcon: require('../assets/icons/tab/mall.png'),
    activeIcon: require('../assets/icons/tab/mall_active.png'),
  },
  {
    name: 'MineTab',
    label: '我的',
    component: MineStack,
    normalIcon: require('../assets/icons/tab/mine.png'),
    activeIcon: require('../assets/icons/tab/mine_active.png'),
  },
];

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00CB8A',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0.5,
          borderTopColor: '#E9E9E9',
          height: 50,
          paddingBottom: 4,
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}>
      {tabConfigs.map(config => (
        <Tab.Screen
          key={config.name}
          name={config.name as keyof TabParamList}
          component={config.component}
          options={{
            tabBarLabel: config.label,
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? config.activeIcon : config.normalIcon}
                style={{ width: 24, height: 24, resizeMode: 'contain' }}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
