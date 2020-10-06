import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SelectCategory from '../../../pages/Provider/Store/SelectCategory';
//import ProviderRoutes from '../index';

const Stack = createStackNavigator();

function StoreRoutesProvider() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="SelectCategory">
        <Stack.Screen name="SelectCategory" component={SelectCategory} 
          options={{
            headerShown: true,            
            headerTitle: 'Categoria do produto'
          }}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StoreRoutesProvider;