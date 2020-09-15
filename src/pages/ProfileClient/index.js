import React from 'react';
import {Container, ButtonExit, TitleButtonExit} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

function ProfileClient() {

    async function handleExit() {
        await AsyncStorage.multiRemove(['@App:token', '@App:name', '@App:email']);
    }

    return(
        <Container>
            <ButtonExit onPress={handleExit}>
                <TitleButtonExit>SAIR</TitleButtonExit>
            </ButtonExit>
        </Container>
    )
}

export default ProfileClient;