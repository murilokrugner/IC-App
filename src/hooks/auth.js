import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import * as Yup from 'yup';
const AuthContext = React.createContext({});

const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

function AuthUser({ children }) {
    const [dataAuth, setDataAuth] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingLogin, setLoadingLogin] = useState(false);
    
    useEffect(() => {
        async function loadStorageData() {
            const [token, name, email, provider, type_document, first_access] = await AsyncStorage.multiGet([
                '@App:token',
                '@App:name',
                '@App:email', 
                '@App:provider',
                '@App:type_document',  
                '@App:first_access',                 
            ]);

            if (token[1] && name[1]) {
                setDataAuth({ token: token[1], name: name[1], email: email[1], prov: provider[1], 
                        type_document: type_document[1], first_access: first_access[1] });
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

            const { name, email, provider, type_document, first_access} = response.data.user;
            const {token} = response.data;

            const prov = provider === true ? '1' : '0';

            await AsyncStorage.multiSet([
                ['@App:token', token],            
                ['@App:name', name],
                ['@App:email', email],
                ['@App:provider', prov],
                ['@App:type_document', type_document],
                ['@App:first_access', first_access],
            ]);

            setDataAuth({ token, name, email, prov, type_document, first_access });

            setLoadingLogin(false);
        } catch (error) {
            setLoadingLogin(false);
            Alert.alert('Dados inválidos');
        }
    };

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@App:token', '@App:name', '@App:email', '@App:provider', '@App:type_document', '@App:first_access']);

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