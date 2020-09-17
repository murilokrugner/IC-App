import React from 'react';
import {Container, ButtonExit, TitleButtonExit} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useAuth } from '../../hooks/auth';

function ProfileClient() {
    const { signOut } = useAuth();


    async function handleExit() {
        signOut();
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