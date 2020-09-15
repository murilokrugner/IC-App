import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../pages/Home';
import ProfileClient from '../../pages/ProfileClient';

import ServicesIcon from '../../assets/services.png';

const Tab = createBottomTabNavigator();

function HomeRoutes() {
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
      <Tab.Screen name="Home" component={Home}
        options={{
        tabBarLabel: 'Serviços',
        tabBarIcon: ({ color, size }) => (
          <Image source={ServicesIcon} style={{width: 32, height: 32}}/>
        ),
      }}
    />
    <Tab.Screen name="ProfileClient" component={ProfileClient}
        options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ color, size }) => (
          <Image source={ServicesIcon} style={{width: 32, height: 32}}/>
        ),
      }}
    />
    </Tab.Navigator>
);
}

export default HomeRoutes;