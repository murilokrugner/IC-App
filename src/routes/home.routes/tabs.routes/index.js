import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../../pages/Home';
import ProfileClient from '../../../pages/Client/ProfileClient';
import MapMain from '../../../pages/MapMain';

import ServicesIcon from '../../../assets/services.png';
import UserIcon from '../../../assets/user.png';
import MapIcon from '../../../assets/map.png';

const Tab = createBottomTabNavigator();

function TabsRoutes() {
  return (
      <Tab.Navigator
      initialRouteName="MapMain"
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
          <Image source={ServicesIcon} style={{width: 30, height: 30}}/>
        ),
      }}
    />
    <Tab.Screen name="MapMain" component={MapMain}
        options={{
        tabBarLabel: 'Mapa',
        tabBarIcon: ({ color, size }) => (
          <Image source={MapIcon} style={{width: 30, height: 30}}/>
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

export default TabsRoutes;