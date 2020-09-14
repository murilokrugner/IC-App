import React from 'react';

import AuthRoutes from './auth.routes';
//mport HomeRoutes from './home.routes';

import { useAuth } from '../hooks/auth';

function Routes() {
  const { user_code, loading } = useAuth();

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    )
  } else {
    if (user_code) {
      return (
        <AuthRoutes />
      )  
    } else {
      return (
        <AuthRoutes />
      )  
    }
  }  
}

export default Routes;