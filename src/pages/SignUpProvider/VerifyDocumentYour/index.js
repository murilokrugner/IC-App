import React, { useState } from 'react';
import { Alert } from 'react-native';

import {
    Container,
    Photo,
    TextTitle,
    ButtonCancel,
    ButtonNext,
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

const VerifyDocumentYour = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { dataAuth } = useAuth();

    const uri = route.params.uri;
    const image = route.params.image;

    const [loading, setLoading] = useState(false);

    function handleBack() {
        navigation.goBack();
    }

    async function handleUploadImage() {
        try {
            setLoading(true);

            await api.post(`photo-document-your?id=${dataAuth.id}`, image, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            Alert.alert('Seu documento foi salvo');
            navigation.navigate('CompleteRegister');
        } catch (error) {
            Alert.alert(
                'Não foi possível adicionar o documento, tente novamente mais tarde'
            );
            setLoading(false);
        }
    }

    return (
        <Container>
            <Photo source={{ uri: uri }} />
            <TextTitle>Sua foto ficou boa?</TextTitle>
            <ButtonNext loading={loading} onPress={handleUploadImage}>
                Sim
            </ButtonNext>
            <ButtonCancel onPress={handleBack}>Tirar novamente</ButtonCancel>
        </Container>
    );
};

export default VerifyDocumentYour;
