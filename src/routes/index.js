import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AuthRoutes from './auth.routes';
import HomeRoutes from './home.routes';
import ProviderRoutes from './provider.routes';

import { useAuth } from '../hooks/auth';

function Routes() {
  const { dataAuth, loading, signOut } = useAuth();

  //signOut();

  console.log(dataAuth);

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    )
  } else {
    if (!dataAuth) {
      return (
        <AuthRoutes />
      )  
    } else if (dataAuth.prov === '0') {
      return (
        <HomeRoutes />
      )  
    } else {
      return (
        <ProviderRoutes />
      )
    }
  }  
}

export default Routes;