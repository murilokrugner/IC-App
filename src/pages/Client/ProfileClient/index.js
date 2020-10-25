import React from 'react';
import {ScrollView} from 'react-native';
import {Container, BoxMenu, BoxOption, BoxSelect, TitleOption, Icon, Line} from './styles';
import { useAuth } from '../../../hooks/auth';

import Profile from '../../../components/Profile';

function ProfileClient() {
    const { signOut } = useAuth();


    async function handleExit() {
        signOut();
    }

    return(
        <ScrollView style={{flex: 1}}>
            <Container>           
                <Profile />
                <BoxMenu>
                    <BoxOption>
                        <BoxSelect>
                            <TitleOption>Meus dados</TitleOption>
                            <Icon name={"edit-2"} size={20} color="#666360" />
                        </BoxSelect>
                    </BoxOption>
                    <Line />
                    <BoxOption>
                        <BoxSelect>
                            <TitleOption>Agenda</TitleOption>
                            <Icon name={"book"} size={20} color="#666360" />
                        </BoxSelect>
                    </BoxOption>
                    <Line />
                    <BoxOption>
                        <BoxSelect>
                            <TitleOption>Minhas avaliações</TitleOption>
                            <Icon name={"star"} size={20} color="#666360" />
                        </BoxSelect>
                    </BoxOption>
                    <Line />
                    <BoxOption onPress={handleExit}>
                        <BoxSelect>
                            <TitleOption>Sair</TitleOption>
                            <Icon name={"log-out"} size={20} color="#666360" />
                        </BoxSelect>
                    </BoxOption>
                    <Line />
                </BoxMenu>                   
            </Container>
        </ScrollView> 
    )
}

export default ProfileClient;