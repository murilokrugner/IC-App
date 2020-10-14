import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProviderRoutes from './Tab';
import AddTypesServices from '../../pages/Provider/ServicesProfileScreen/AddTypesServices';
import EditCompleteServices from '../../pages/Provider/ServicesProfileScreen/EditCompleteServices';

import CreateProduct from '../../pages/Provider/Store/CreateProduct';
import AddImagesProduct from '../../pages/Provider/Store/AddImagesProduct';

import FirstAccessRoutes from './FirstAccessRoutes';

const Stack = createStackNavigator();

function RoutesProviderAll() {
    return(
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="ProviderRoutes">
        <Stack.Screen name="ProviderRoutes" component={ProviderRoutes} 
           options={{
            headerShown: false,
            
          }}
        />  
        <Stack.Screen name="CreateProduct" component={CreateProduct} 
           options={{
            headerShown: true,
            headerTitle: "Cadastrar um produto"
            
          }}
        />   
        <Stack.Screen name="AddImagesProduct" component={AddImagesProduct} 
           options={{
            headerShown: false,            
          }}
        />  
        <Stack.Screen name="AddTypesServices" component={AddTypesServices} 
           options={{
            headerShown: true,
            headerTitle: "Adicione um novo serviço"
            
          }}
        />   
        <Stack.Screen name="EditCompleteServices" component={EditCompleteServices} 
           options={{
            headerShown: true,
            headerTitle: "Editar serviço"
            
          }}
        />    
        <Stack.Screen name="FirstAccessRoutes" component={FirstAccessRoutes} 
           options={{
            headerShown: false,          
          }}
        />   
      </Stack.Navigator>
    </NavigationContainer>

    );
   
}

export default RoutesProviderAll;