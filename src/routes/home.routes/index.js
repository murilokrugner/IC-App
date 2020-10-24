import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../pages/Home';
import ProfileClient from '../../pages/Client/ProfileClient';

import ServicesIcon from '../../assets/services.png';
import HomeIcon from '../../assets/home.png';
import UserIcon from '../../assets/user.png';

const Tab = createBottomTabNavigator();

function HomeRoutes() {
  return (
      <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        activeTintColor: '#fff',
        activeBackgroundColor: '#235A5C',
        inactiveBackgroundColor: '#235A5C',
        inactiveTintColor: '#000',
        tabStyle: {
        },
        style: {
          height: Platform.OS === 'ios' ? 100 : 55
        },
    }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
        tabBarLabel: 'Serviços',
        tabBarIcon: ({ color, size }) => (
          <Image source={HomeIcon} style={{width: 30, height: 30}}/>
        ),
      }}
    />
    <Tab.Screen name="ProfileClient" component={ProfileClient}
        options={{
        tabBarLabel: 'Meu Perfil',        
        tabBarIcon: ({ color, size }) => (
          <Image source={UserIcon} style={{width: 30, height: 30}}/>
        ),
      }}
    />
    </Tab.Navigator>
);
}

export default HomeRoutes;