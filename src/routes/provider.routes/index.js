import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProviderRoutes from './Tab';
import StoreRoutesProvider from './Store';
import AddServiceRoutesProvider from './Services/AddService';   

import EditServiceRoutesProvider from './Services/EditService';   

const Stack = createStackNavigator();

function RoutesProviderAll() {
    return(
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="ProviderRoutes">
        <Stack.Screen name="ProviderRoutes" component={ProviderRoutes} 
          
        />
        <Stack.Screen name="StoreRoutesProvider" component={StoreRoutesProvider} 
          
        />   
        <Stack.Screen name="EditServiceRoutesProvider" component={EditServiceRoutesProvider} 
        />   
        <Stack.Screen name="AddServiceRoutesProvider" component={AddServiceRoutesProvider} 
        />     
      </Stack.Navigator>
    </NavigationContainer>

    );
   
}

export default RoutesProviderAll;