import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CompleteRegister from '../../../pages/Provider/CompleteRegister';
import AddTypesServices from '../../../pages/Provider/AddTypesServices';
import CompleteServices from '../../../pages/Provider/CompleteServices';
import EditCompleteServices from '../../../pages/Provider/EditCompleteServices';

import TakePhotoDocument from '../../../pages/SignUpProvider/TakePhotoDocument';
import TakePhotoDocumentVerse from '../../../pages/SignUpProvider/TakePhotoDocumentVerse';
import DocumentsCaptions from '../../../pages/SignUpProvider/DocumentsCaptions';
import TakeYourPhoto from '../../../pages/SignUpProvider/TakeYourPhoto';
import VerifyDocument from '../../../pages/SignUpProvider/VerifyDocument';

import RoutesProviderAll from '../index';

const Stack = createStackNavigator();

function FirstAccessAutonomousRoutes() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    headerTitleAlign: 'center',
                    cardStyle: { backgroundColor: '#fff' },
                }}
                initialRouteName="TakePhotoDocument"
            >
                <Stack.Screen
                    name="CompleteServices"
                    component={CompleteServices}
                    options={{
                        headerShown: true,
                        headerTitle: 'Complete os serviços',
                    }}
                />
                <Stack.Screen
                    name="CompleteRegister"
                    component={CompleteRegister}
                    options={{
                        headerShown: true,
                        headerTitle: 'Complete seu perfil',
                    }}
                />
                <Stack.Screen
                    name="AddTypesServices"
                    component={AddTypesServices}
                    options={{
                        headerShown: true,
                        headerTitle: 'Adicione seus serviços',
                    }}
                />
                <Stack.Screen
                    name="EditCompleteServices"
                    component={EditCompleteServices}
                    options={{
                        headerShown: true,
                        headerTitle: 'Editar serviço',
                    }}
                />
                <Stack.Screen
                    name="RoutesProviderAll"
                    component={RoutesProviderAll}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="TakePhotoDocument"
                    component={TakePhotoDocument}
                    options={{
                        headerShown: true,
                        headerTitle:
                            'Tire uma foto do seu documento - RG ou CNH',
                    }}
                />
                <Stack.Screen
                    name="TakePhotoDocumentVerse"
                    component={TakePhotoDocumentVerse}
                    options={{
                        headerShown: true,
                        headerTitle:
                            'Tire uma foto do seu documento - RG ou CNH',
                    }}
                />
                <Stack.Screen
                    name="TakeYourPhoto"
                    component={TakeYourPhoto}
                    options={{
                        headerShown: true,
                        headerTitle: 'Tire uma foto segurando o seu documento',
                    }}
                />
                <Stack.Screen
                    name="VerifyDocument"
                    component={VerifyDocument}
                    options={{
                        headerShown: true,
                        headerTitle: 'Foto pronta!',
                    }}
                />
                <Stack.Screen
                    name="DocumentsCaptions"
                    component={DocumentsCaptions}
                    options={{
                        headerShown: true,
                        headerTitle: '',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default FirstAccessAutonomousRoutes;
