import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Container, BoxMenu, BoxOption, BoxSelect, TitleOption, Icon, Line} from './styles';
import { useAuth } from '../../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import Profile from '../../../components/Profile';
import ImagePicker from 'react-native-image-picker';

import Camera from '../../../assets/camera.png';
import Stars from '../../../assets/starts.png';
import Add from '../../../assets/add.png';
import api from '../../../services/api';

function ProfileClient() {
    const { dataAuth, signOut } = useAuth();
    const navigation = useNavigation();

    const userId = dataAuth.id;

    async function handleExit() {
        signOut();
    }

    function handleClientData() {
        navigation.navigate('ClientData');
    }

    return(
        <ScrollView style={{flex: 1}}>
            <Container>
                <Profile />
                <BoxMenu>
                    <BoxOption onPress={handleClientData}>
                        <BoxSelect>
                            <TitleOption>Meus dados</TitleOption>
                            <Icon name={"edit-2"} size={20} color="#666360" />
                        </BoxSelect>
                    </BoxOption>
                    <Line />
                  {/**  <BoxOption>
                        <BoxSelect>
                            <TitleOption>Agenda</TitleOption>
                            <Icon name={"book"} size={20} color="#666360" />
                        </BoxSelect>
                    </BoxOption>
                    <Line />*/}
                  {/**   <BoxOption>
                        <BoxSelect>
                            <TitleOption>Minhas avaliações</TitleOption>
                            <Icon name={"star"} size={20} color="#666360" />
                        </BoxSelect>
                    </BoxOption>
                  <Line /> **/}
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
