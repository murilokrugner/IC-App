import React, { useCallback, createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';

const AuthContext = React.createContext({});

function AuthUser({ children }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingLogin, setLoadingLogin] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            const [token, user_code, user_name, user_email] = await AsyncStorage.multiGet([
                '@App:token',
                '@App:user_code',
                '@App:user_name',
                '@App:user_email',                
            ]);

            if (token[1] && user_name[1]) {
                setData({ token: token[1], user_code: user_code[1], user_name: user_name[1], user_email: user_email[1] });
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn( user_password ) {
        setLoadingLogin(true);
        const response = await api.post('session', {
            user_email,
            user_password,
        });

        if (!response.data) {
            Alert.alert('Dados inválidos');
            setLoadingLogin(false);
            return;
        }

        const { token, user_code, user_name, user_email} = response.data;

        await AsyncStorage.multiSet([
            ['@AbramidesApp:token', token],            
            ['@AbramidesApp:user_code', user_code],
            ['@AbramidesApp:user_name', user_name],
            ['@AbramidesApp:user_email', user_email],
        ]);

        setData({ token, user_code, user_name, user_email });

        setLoadingLogin(false);
    };

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@AbramidesApp:token', '@AbramidesApp:user_code', '@AbramidesApp:user_name', '@AbramidesApp:email']);

        setData();
    }, []);

    return (
        <AuthContext.Provider value={{user_code: data.user_code, user_name: data.user_name, loading, signIn, signOut, user_email: data.user_email }}>
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