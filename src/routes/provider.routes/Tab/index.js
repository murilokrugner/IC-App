import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../../pages/Provider/Home';
import Profile from '../../../pages/Provider/Profile';
import Store from '../../../pages/Provider/Store';
import CifraoIcon from '../../../assets/cifrao.png';
import MyStore from '../../../pages/Provider/Store/MyStore';

import HomeIcon from '../../../assets/home.png';
import ProfileIcon from '../../../assets/profile.png';

const Tab = createBottomTabNavigator();

function ProviderRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        labelStyle: {
          fontSize: 14,
        },
        activeTintColor: '#000',
        activeBackgroundColor: '#E8E8E8',        
        inactiveBackgroundColor: '#fff',
        inactiveTintColor: '#000',
        tabStyle: {
        },
        style: {
          height: Platform.OS === 'ios' ? 100 : 55,          
        },
    }}
    >          
    <Tab.Screen name="Profile" component={Profile}
        options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Image source={ProfileIcon} style={{width: 40, height: 40}}/>
        ),
      }}
    /> 
    <Tab.Screen name="Home" component={Home}
        options={{
        tabBarLabel: '',    
        tabBarIcon: ({ color, size }) => (
          <Image source={HomeIcon} style={{width: 50, height: 50}}/>
        ),
      }}
    />
    <Tab.Screen name="Store" component={Store}
        options={{
        tabBarLabel: 'Store',
        tabBarIcon: ({ color, size }) => (
          <Image source={CifraoIcon} style={{width: 44, height: 44}}/>
        ),
      }}
    />             
    </Tab.Navigator>
);
}

export default ProviderRoutes;