import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const AuthContext = React.createContext({});

function AuthUser({ children }) {
    const [dataAuth, setDataAuth] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingLogin, setLoadingLogin] = useState(false);
    
    useEffect(() => {
        async function loadStorageData() {
            const [token, name, email] = await AsyncStorage.multiGet([
                '@App:token',
                '@App:name',
                '@App:email',                
            ]);

            if (token[1] && name[1]) {
                setDataAuth({ token: token[1], name: name[1], email: email[1] });
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn(user_email, password) {
        try {
            setLoadingLogin(true);
            const response = await api.post('session', {
                email: user_email,
                password: password,
            });

            const { name, email} = response.data.user;
            const {token} = response.data;

            await AsyncStorage.multiSet([
                ['@App:token', token],            
                ['@App:name', name],
                ['@App:email', email],
            ]);

            setDataAuth({ token, name, email });

            setLoadingLogin(false);
        } catch (error) {
            setLoadingLogin(false);
            Alert.alert('Dados inválidos');
        }
    };

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@App:token', '@App:name', '@App:email']);

        setDataAuth();
    }, []);

    
    return (
        <AuthContext.Provider value={{dataAuth, loading, signIn, loadingLogin, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthUser');
    }

    return context;
}


export {AuthUser, useAuth};