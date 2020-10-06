import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EditCompleteServices from '../../../../pages/Provider/ServicesProfileScreen/EditCompleteServices';

const Stack = createStackNavigator();

function EditServiceRoutesProvider() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },
        }}
          >
        <Stack.Screen name="EditCompleteServices" component={EditCompleteServices} 
          options={{
            headerShown: true,
            headerTitle: "Editar serviço"
            
          }}
        />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default EditServiceRoutesProvider;