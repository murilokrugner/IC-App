import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import SignUpProvider from '../../pages/SignUpProvider';
import WhatUser from '../../pages/WhatUser';

import WithCnpj from '../../pages/RegisterDocumentProvider/WithCnpj';

import ForgotPassword from '../../pages/ForgotPassword';

//import pattern from '../../assets/pattern_com_fundo.png';

import WithCpfAutonomous from '../../pages/SignUpProvider/Autonomous/RegisterDocumentProvider/WithCpfAutonomous';
import WhatDocument from '../../pages/SignUpProvider/WhatDocument';
import SignUpProviderAutonomous from '../../pages/SignUpProvider/SignUpProviderAutonomous';

const Auth = createStackNavigator();

function AuthRoutes() {
    return (
        <NavigationContainer independent={true}>
            <Auth.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#fff' },
                }}
                initialRouteName="SignIn"
            >
                <Auth.Screen name="SignIn" component={SignIn} />
                <Auth.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                        headerShown: true,
                        headerTitle: 'Criar conta Cliente',
                    }}
                />
                <Auth.Screen
                    name="SignUpProvider"
                    component={SignUpProvider}
                    options={{
                        headerShown: true,
                        headerTitle: 'Criar conta Prestador',
                    }}
                />
                <Auth.Screen
                    name="SignUpProviderAutonomous"
                    component={SignUpProviderAutonomous}
                    options={{
                        headerShown: true,
                        headerTitle: 'Criar conta Prestador',
                    }}
                />
                <Auth.Screen
                    name="WhatUser"
                    component={WhatUser}
                    options={{
                        headerShown: true,
                        headerTitle: 'Cadastro',
                    }}
                />
                <Auth.Screen
                    name="WhatDocument"
                    component={WhatDocument}
                    options={{
                        headerShown: true,
                        headerTitle: 'Você tem?',
                    }}
                />
                <Auth.Screen
                    name="WithCnpj"
                    component={WithCnpj}
                    options={{
                        headerShown: true,
                        headerTitle: 'Informe seu CNPJ',
                    }}
                />
                <Auth.Screen
                    name="WithCpfAutonomous"
                    component={WithCpfAutonomous}
                    options={{
                        headerShown: true,
                        headerTitle: 'Informe seu CPF',
                    }}
                />
                <Auth.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{
                        headerShown: true,
                        headerTitle: 'Esqueci a senha',
                    }}
                />
            </Auth.Navigator>
        </NavigationContainer>
    );
}

export default AuthRoutes;
