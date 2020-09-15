import React, { useCallback, createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';
import { useAuth } from '../hooks/auth';

const AuthContext = React.createContext({});

function AuthUser({ children }) {
    const [data, setData] = useState();
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
                setData({ token: token[1], name: name[1], email: email[1] });
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn( {user_email, password} ) {
        setLoadingLogin(true);
        const response = await api.post('session', {
            email: user_email,
            password: password,
        });

        if (!response.data) {
            Alert.alert('Dados inválidos');
            setLoadingLogin(false);
            return;
        }

        const { token, id, name, email} = response.data;

        await AsyncStorage.multiSet([
            ['@AbramidesApp:token', token],            
            ['@AbramidesApp:id', id],
            ['@AbramidesApp:name', name],
            ['@AbramidesApp:email', email],
        ]);

        setData({ token, id, ame, email });

        setLoadingLogin(false);
    };

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@AbramidesApp:token', '@AbramidesApp:id', '@AbramidesApp:name', '@AbramidesApp:email']);

        setData();
    }, []);

    return (
        <AuthContext.Provider value={{name: data.name, loading, signIn, signOut, email: data.email }}>
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