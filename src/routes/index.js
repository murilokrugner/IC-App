import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AuthRoutes from './auth.routes';
import HomeRoutes from './home.routes';

import { useAuth } from '../hooks/auth';

function Routes() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);

  const { email } = useAuth();

  /*useEffect(() => {
    async function loadStorageData() {
      const [token, id, name, email] = await AsyncStorage.multiGet([
          '@App:token',
          '@App:name',
          '@App:email',                
      ]);

      if (token[1] && name[1]) {
          setData(true);
          
      }    
      
      setLoading(false);
    }

  loadStorageData();
  })*/

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    )
  } else {
    if (email) {
      return (
        <HomeRoutes />
      )  
    } else {
      return (
        <AuthRoutes />
      )  
    }
  }  
}

export default Routes;