import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../pages/Provider/Home';

import ServicesIcon from '../../assets/services.png';

import CompleteServices from '../../pages/Provider/CompleteServices';

const Tab = createBottomTabNavigator();

function ProviderRoutes() {
  return (
      <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
        },
        activeTintColor: '#fff',
        activeBackgroundColor: '#f08080',
        inactiveBackgroundColor: '#f08080',
        inactiveTintColor: '#000',
        tabStyle: {
        },
        style: {
          height: Platform.OS === 'ios' ? 100 : 65
        },
    }}
    >
      <Tab.Screen name="CompleteServices" component={CompleteServices}
        options={{
        tabBarLabel: 'Serviços',
        tabBarIcon: ({ color, size }) => (
          <Image source={ServicesIcon} style={{width: 32, height: 32}}/>
        ),
      }}
    />
    </Tab.Navigator>
);
}

export default ProviderRoutes;