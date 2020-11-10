import React from 'react';
import { Alert } from 'react-native';
import {
    Container,
    Box,
    BoxTitle,
    Line,
    BoxImages,
    ButtonProvider,
    ImageProvider,
    ButtonClient,
    ImageClient,
} from './styles';

import { useNavigation } from '@react-navigation/native';

import Provider from '../../assets/prestador_de_servico.jpg';
import Client from '../../assets/cliente.jpg';

function WhatUser() {
    const navigation = useNavigation();

    return (
        <Container>
            <Box>
                <BoxTitle>Você é um?</BoxTitle>
                <Line />
                <BoxImages>
                    <ButtonClient
                        onPress={() => {
                            navigation.navigate('SignUp');
                        }}
                    >
                        <ImageClient source={Client} />
                    </ButtonClient>

                    <ButtonProvider
                        onPress={() => {
                            navigation.navigate('WhatDocument');
                        }}
                    >
                        <ImageProvider source={Provider} />
                    </ButtonProvider>
                </BoxImages>
            </Box>
        </Container>
    );
}

export default WhatUser;
