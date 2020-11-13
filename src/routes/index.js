import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from './auth.routes';
import ClientRoutes from './home.routes';
import RoutesProviderAll from './provider.routes/index';
import FirstAccessRoutes from './provider.routes/FirstAccessRoutes';
import FirstAccessAutonomousRoutes from './provider.routes/FirstAccessAutonomousRoutes';

import { useAuth } from '../hooks/auth';

function Routes() {
    const { dataAuth, loading, signOut } = useAuth();

    // signOut();

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    } else {
        if (!dataAuth) {
            return <AuthRoutes />;
        } else if (dataAuth.prov === '0') {
            return <ClientRoutes />;
        } else if (
            dataAuth.prov === '1' &&
            dataAuth.first_access === '0' &&
            dataAuth.block === '1'
        ) {
            return <FirstAccessAutonomousRoutes />;
        } else if (dataAuth.prov === '1' && dataAuth.first_access === '0') {
            return <FirstAccessRoutes />;
        } else {
            return <RoutesProviderAll />;
        }
    }
}

export default Routes;
