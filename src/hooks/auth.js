import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
} from 'react';
import { Alert } from 'react-native';
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
            const [
                id,
                token,
                name,
                email,
                provider,
                type_document,
                first_access,
                block,
            ] = await AsyncStorage.multiGet([
                '@App:id',
                '@App:token',
                '@App:name',
                '@App:email',
                '@App:provider',
                '@App:type_document',
                '@App:first_access',
                '@App:blocked',
            ]);

            if (token[1] && name[1]) {
                setDataAuth({
                    id: id[1],
                    token: token[1],
                    name: name[1],
                    email: email[1],
                    prov: provider[1],
                    type_document: type_document[1],
                    first_access: first_access[1],
                    block: block[1],
                });
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

            const {
                name,
                email,
                provider,
                type_document,
                first_access,
                blocked,
            } = response.data.user;
            const idInt = response.data.user.id;
            const { token } = response.data;

            const prov = provider === true ? '1' : '0';

            const block = blocked === true ? '1' : '0';

            await AsyncStorage.multiSet([
                ['@App:id', idInt.toString()],
                ['@App:token', token],
                ['@App:name', name],
                ['@App:email', email],
                ['@App:provider', prov],
                ['@App:type_document', type_document],
                ['@App:first_access', first_access],
                ['@App:blocked', block],
            ]);

            const id = idInt.toString();

            setDataAuth({
                id,
                token,
                name,
                email,
                prov,
                type_document,
                first_access,
                block,
            });

            setLoadingLogin(false);
        } catch (error) {
            setLoadingLogin(false);
            Alert.alert(
                'Não foi possível fazer login, tente novamente mais tarde'
            );
        }
    }

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove([
            '@App:id',
            '@App:token',
            '@App:name',
            '@App:email',
            '@App:provider',
            '@App:type_document',
            '@App:first_access',
            '@App:blocked',
        ]);

        setDataAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{ dataAuth, loading, signIn, loadingLogin, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthUser');
    }

    return context;
}

export { AuthUser, useAuth };
